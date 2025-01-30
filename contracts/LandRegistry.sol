// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 id;
        address owner;
        string location;
        uint256 area;
        bool isForSale;
        uint256 price;
    }

    mapping(uint256 => Land) public lands;
    mapping(address => uint256[]) public ownedLands;
    uint256 public landCounter;

    event LandRegistered(uint256 indexed landId, address owner, string location);
    event LandListedForSale(uint256 indexed landId, uint256 price);
    event LandTransferred(uint256 indexed landId, address from, address to);

    // Register a new land
    function registerLand(string memory _location, uint256 _area) public {
        landCounter++;
        
        lands[landCounter] = Land({
            id: landCounter,
            owner: msg.sender,
            location: _location,
            area: _area,
            isForSale: false,
            price: 0
        });

        ownedLands[msg.sender].push(landCounter);

        emit LandRegistered(landCounter, msg.sender, _location);
    }

    // List land for sale
    function listLandForSale(uint256 _landId, uint256 _price) public {
        require(lands[_landId].owner == msg.sender, "Only owner can list land");
        
        lands[_landId].isForSale = true;
        lands[_landId].price = _price;

        emit LandListedForSale(_landId, _price);
    }

    // Transfer land to another address
    function transferLand(uint256 _landId, address _newOwner) public {
        require(lands[_landId].owner == msg.sender, "Only owner can transfer");
        
        // Remove from current owner's list
        _removeLandFromOwner(msg.sender, _landId);
        
        // Update ownership
        lands[_landId].owner = _newOwner;
        
        // Add to new owner's list
        ownedLands[_newOwner].push(_landId);

        emit LandTransferred(_landId, msg.sender, _newOwner);
    }

    // Buy land that is for sale
    function buyLand(uint256 _landId) public payable {
        Land storage land = lands[_landId];
        
        require(land.isForSale, "Land is not for sale");
        require(msg.value >= land.price, "Insufficient funds");

        address previousOwner = land.owner;

        // Transfer funds to previous owner
        payable(previousOwner).transfer(land.price);

        // Remove land from previous owner
        _removeLandFromOwner(previousOwner, _landId);

        // Update land ownership
        land.owner = msg.sender;
        land.isForSale = false;
        land.price = 0;

        // Add to new owner's list
        ownedLands[msg.sender].push(_landId);

        emit LandTransferred(_landId, previousOwner, msg.sender);
    }

    // Get lands owned by an address
    function getLandsByOwner(address _owner) public view returns (Land[] memory) {
        uint256[] memory landIds = ownedLands[_owner];
        Land[] memory ownerLands = new Land[](landIds.length);

        for (uint256 i = 0; i < landIds.length; i++) {
            ownerLands[i] = lands[landIds[i]];
        }

        return ownerLands;
    }

    // Get lands for sale
    function getLandsForSale() public view returns (Land[] memory) {
        Land[] memory forSaleLands = new Land[](landCounter);
        uint256 count = 0;

        for (uint256 i = 1; i <= landCounter; i++) {
            if (lands[i].isForSale) {
                forSaleLands[count] = lands[i];
                count++;
            }
        }

        // Resize array to actual count
        Land[] memory result = new Land[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = forSaleLands[i];
        }

        return result;
    }

    // Internal function to remove land from owner's list
    function _removeLandFromOwner(address _owner, uint256 _landId) internal {
        uint256[] storage ownerLands = ownedLands[_owner];
        for (uint256 i = 0; i < ownerLands.length; i++) {
            if (ownerLands[i] == _landId) {
                ownerLands[i] = ownerLands[ownerLands.length - 1];
                ownerLands.pop();
                break;
            }
        }
    }
}