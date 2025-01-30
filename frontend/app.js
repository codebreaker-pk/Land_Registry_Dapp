// Global Variables
let web3;
let contract;
let userAccount;

// Contract Configuration (IMPORTANT: Replace these)
const CONTRACT_ADDRESS = '0x717E4d41857B76A062490Af6Bef3E7Ab88da0B43'; 
const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "landId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "LandListedForSale",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "landId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "location",
            "type": "string"
          }
        ],
        "name": "LandRegistered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "landId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "LandTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "landCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "lands",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "area",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isForSale",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ownedLands",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_location",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_area",
            "type": "uint256"
          }
        ],
        "name": "registerLand",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_landId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "listLandForSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_landId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "transferLand",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_landId",
            "type": "uint256"
          }
        ],
        "name": "buyLand",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "getLandsByOwner",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "area",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isForSale",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "internalType": "struct LandRegistry.Land[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getLandsForSale",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "area",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isForSale",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "internalType": "struct LandRegistry.Land[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
]; // Full ABI from contract JSON

// Wallet Connection Function
async function connectWallet() {
    console.log('Connect Wallet function called');

    // Check if Metamask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            console.log('Requesting account access');
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            // Set user account
            userAccount = accounts[0];
            console.log('Connected Account:', userAccount);

            // Update UI
            updateWalletUI(userAccount);
            updateNetworkStatus();

            // Initialize Web3
            web3 = new Web3(window.ethereum);

            // Initialize Contract
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

            // Load User Lands
            await loadUserLands();
            await loadMarketplaceLands();
            await populateLandDropdowns();

            // Show Success Notification
            Swal.fire({
                icon: 'success',
                title: 'Wallet Connected',
                text: `Connected with ${userAccount}`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

        } catch (error) {
            console.error("Wallet Connection Error:", error);
            
            Swal.fire({
                icon: 'error',
                title: 'Connection Failed',
                text: error.message
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Metamask Not Found',
            text: 'Please install Metamask browser extension',
            confirmButtonText: 'Install Metamask',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('https://metamask.io/download.html', '_blank');
            }
        });
    }
}

// Update Wallet UI
function updateWalletUI(account) {
    const connectButton = document.getElementById('connectWallet');
    
    if (account) {
        connectButton.innerHTML = `
            <i class="fas fa-wallet"></i> 
            ${account.substring(0,6)}...${account.substring(account.length-4)}
        `;
        connectButton.classList.remove('btn-light');
        connectButton.classList.add('btn-success');
    } else {
        connectButton.innerHTML = `
            <i class="fas fa-wallet"></i> Connect Wallet
        `;
        connectButton.classList.remove('btn-success');
        connectButton.classList.add('btn-light');
    }
}

// Update Network Status
function updateNetworkStatus() {
    const networkStatus = document.getElementById('networkStatus');
    
    if (web3 && web3.eth) {
        web3.eth.net.getId()
            .then(networkId => {
                const networks = {
                    1: 'Ethereum Mainnet',
                    3: 'Ropsten Testnet',
                    4: 'Rinkeby Testnet',
                    5: 'Goerli Testnet',
                    5777: 'Ganache Local'
                };
                networkStatus.innerHTML = `
                    <i class="fas fa-network-wired"></i> 
                    ${networks[networkId] || 'Unknown Network'}
                `;
            })
            .catch(error => {
                networkStatus.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i> 
                    Network Error
                `;
            });
    }
}

// Populate Land Dropdowns
async function populateLandDropdowns() {
    if (!contract || !userAccount) return;

    try {
        // Get user's lands
        const userLands = await contract.methods.getLandsByOwner(userAccount).call();
        
        // Populate List Land Dropdown
        const listLandSelect = document.getElementById('landToList');
        const transferLandSelect = document.getElementById('landToTransfer');
        
        // Clear previous options
        listLandSelect.innerHTML = '<option value="">Select Land to List</option>';
        transferLandSelect.innerHTML = '<option value="">Select Land to Transfer</option>';

        // Add land options
        userLands.forEach((land) => {
            const listOption = `
                <option value="${land.id}">
                    Land ${land.id} - ${land.location}
                </option>
            `;
            
            listLandSelect.innerHTML += listOption;
            transferLandSelect.innerHTML += listOption;
        });

    } catch (error) {
        console.error('Failed to populate land dropdowns:', error);
        Swal.fire({
            icon: 'error',
            title: 'Dropdown Population Failed',
            text: error.message
        });
    }
}

// Register Land
async function registerLand(event) {
    event.preventDefault();

    // Validate wallet connection
    if (!userAccount) {
        Swal.fire({
            icon: 'warning',
            title: 'Wallet Not Connected',
            text: 'Please connect your wallet first'
        });
        return;
    }

    const location = document.getElementById('location').value;
    const area = document.getElementById('area').value;

    try {
        // Register land transaction
        await contract.methods.registerLand(location, area)
            .send({ from: userAccount });

        Swal.fire({
            icon: 'success',
            title: 'Land Registered',
            text: 'Your land has been successfully registered'
        });
        
        // Reload lands and dropdowns
        await loadUserLands();
        await populateLandDropdowns();

        // Reset form
        event.target.reset();

    } catch (error) {
        console.error('Registration failed:', error);
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.message
        });
    }
}

// Load User Lands
async function loadUserLands() {
    // Validate contract and user account
    if (!contract || !userAccount) {
        console.log('Contract or user account not ready');
        return;
    }

    try {
        // Get lands for current user
        const userLands = await contract.methods.getLandsByOwner(userAccount).call();
        
        // Get table body
        const tableBody = document.getElementById('landsTableBody');
        
        // Clear previous entries
        tableBody.innerHTML = '';

        // Check if user has no lands
        if (userLands.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        No lands registered yet
                    </td>
                </tr>
            `;
            return;
        }

        // Populate lands
        userLands.forEach((land) => {
            const row = `
                <tr>
                    <td>${land.id}</td>
                    <td>${land.location}</td>
                    <td>${land.area} sq meters</td>
                    <td>${land.isForSale ? 'For Sale' : 'Not Listed'}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button 
                                class="btn btn-sm btn-info" 
                                onclick="viewLandDetails(${land.id})"
                            >
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Failed to load lands:', error);
        Swal.fire({
            icon: 'error',
            title: 'Land Loading Failed',
            text: error.message
        });
    }
}

// Load Marketplace Lands
async function loadMarketplaceLands() {
    if (!contract) {
        console.log('Contract not initialized');
        return;
    }

    try {
        // Get lands for sale
        const marketplaceLands = await contract.methods.getLandsForSale().call();
        
        // Get marketplace table body
        const marketplaceBody = document.getElementById('marketplaceTableBody');
        
        // Clear previous entries
        marketplaceBody.innerHTML = '';

        // Check if no lands for sale
        if (marketplaceLands.length === 0) {
            marketplaceBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        No lands available for sale
                    </td>
                </tr>
            `;
            return;
        }

        // Populate marketplace lands
        marketplaceLands.forEach((land) => {
            const row = `
                <tr>
                    <td>${land.id}</td>
                    <td>${land.location}</td>
                    <td>${land.area} sq meters</td>
                    <td>${web3.utils.fromWei(land.price, 'ether')} ETH</td>
                    <td>
                        <button 
                            class="btn btn-sm btn-success" 
                            onclick="buyLand(${land.id})"
                        >
                            <i class="fas fa-shopping-cart"></i> Buy
                        </button>
                    </td>
                </tr>
            `;
            
            marketplaceBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Failed to load marketplace lands:', error);
        Swal.fire({
            icon: 'error',
            title: 'Marketplace Loading Failed',
            text: error.message
        });
    }
}

// Buy Land
async function buyLand(landId) {
    if (!userAccount) {
        Swal.fire({
            icon: 'warning',
            title: 'Wallet Not Connected',
            text: 'Please connect your wallet first'
        });
        return;
    }

    try {
        // Get land details to get the price
        const land = await contract.methods.lands(landId).call();
        
        await contract.methods.buyLand(landId)
            .send({ 
                from: userAccount, 
                value: land.price 
            });
        
        Swal.fire({
            icon: 'success',
            title: 'Land Purchased',
            text: 'You have successfully bought the land'
        });

        // Reload lands and marketplace
        await loadUserLands();
        await loadMarketplaceLands();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Purchase Failed',
            text: error.message
        });
    }
}

// List Land for Sale
async function listLandForSale(event) {
    event.preventDefault();

    if (!userAccount) {
        Swal.fire({
            icon: 'warning',
            title: 'Wallet Not Connected',
            text: 'Please connect your wallet first'
        });
        return;
    }

    const landId = document.getElementById('landToList').value;
    const salePrice = document.getElementById('salePrice').value;

    try {
        await contract.methods.listLandForSale(landId, web3.utils.toWei(salePrice, 'ether'))
            .send({ from: userAccount });
        
        Swal.fire({
            icon: 'success',
            title: 'Land Listed',
            text: 'Your land has been listed for sale'
        });

        // Reload lands and marketplace
        await loadUserLands();
        await loadMarketplaceLands();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('listLandModal'));
        modal.hide();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Listing Failed',
            text: error.message
        });
    }
}

// Transfer Land
async function transferLand(event) {
    event.preventDefault();

    if (!userAccount) {
        Swal.fire({
            icon: 'warning',
            title: 'Wallet Not Connected',
            text: 'Please connect your wallet first'
        });
        return;
    }

    const landId = document.getElementById('landToTransfer').value;
    const recipientAddress = document.getElementById('recipientAddress').value;

    try {
        await contract.methods.transferLand(landId, recipientAddress)
            .send({ from: userAccount });
        
        Swal.fire({
            icon: 'success',
            title: 'Land Transferred',
            text: 'Land has been successfully transferred'
        });

        // Reload lands
        await loadUserLands();
        await populateLandDropdowns();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('transferLandModal'));
        modal.hide();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Transfer Failed',
            text: error.message
        });
    }
}

// View Land Details
async function viewLandDetails(landId) {
    try {
        const land = await contract.methods.lands(landId).call();
        
        Swal.fire({
            title: 'Land Details',
            html: `
                <div class="text-start">
                    <p><strong>Land ID:</strong> ${landId}</p>
                    <p><strong>Location:</strong> ${land.location}</p>
                    <p><strong>Area:</strong> ${land.area} sq meters</p>
                    <p><strong>Owner:</strong> ${land.owner}</p>
                    <p><strong>Status:</strong> ${land.isForSale ? 'For Sale' : 'Not Listed'}</p>
                </div>
            `,
            icon: 'info'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to Load Details',
            text: error.message
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Wallet Connection
    const connectButton = document.getElementById('connectWallet');
    connectButton.addEventListener('click', connectWallet);

    // Land Registration Form
    const registrationForm = document.getElementById('landRegistrationForm');
    registrationForm.addEventListener('submit', registerLand);

    // List Land Form
    const listLandForm = document.getElementById('listLandForm');
    listLandForm.addEventListener('submit', listLandForSale);

    // Transfer Land Form
    const transferLandForm = document.getElementById('transferLandForm');
    transferLandForm.addEventListener('submit', transferLand);
});