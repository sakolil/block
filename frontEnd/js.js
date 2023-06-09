// Update with the contract ABI and address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "PatientInfoUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "PatientRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPatients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "privateKey",
						"type": "bytes32"
					}
				],
				"internalType": "struct PatientRegistry.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "isAdminUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "updatePatientInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; // Replace with the ABI of the PatientRegistry contract
const contractAddress = '0xED2cEBF63d3cC9e32c75862D716371D512b429C4'; // Replace with the address of the deployed PatientRegistry contract

// Connect to the Ethereum network
const web3 = new Web3('https://sepolia.infura.io/v3/'); // Replace with your Ethereum provider URL

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Grant admin privileges
async function grantAdminPrivileges(adminAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.addAdmin(adminAddress).send({ from: accounts[0] });
        console.log('Admin privileges granted:', result);
    } catch (error) {
        console.error('Error granting admin privileges:', error);
    }
}

// Revoke admin privileges
async function revokeAdminPrivileges(adminAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.removeAdmin(adminAddress).send({ from: accounts[0] });
        console.log('Admin privileges revoked:', result);
    } catch (error) {
        console.error('Error revoking admin privileges:', error);
    }
}

// Update patient information
async function updatePatientInfo(patientAddress, name, lastName, dob, gender, id) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.updatePatientInfo(patientAddress, name, lastName, dob, gender, id).send({ from: accounts[0] });
        console.log('Patient information updated:', result);
    } catch (error) {
        console.error('Error updating patient information:', error);
    }
}

async function RegisterPatient(){
    var name = document.getElementById("name");
    var lastName = document.getElementById("last-name")
    var dob = document.getElementById("dob")
    var gender = document.getElementById("gender")
    var id = document.getElementById("id")



    try{
        contract.methods.RegisterPatient(name,lastName,dob,gender,id);
    }
    catch(error){
        console.error("Error registering patient",error);
    }
}

// Check if an address has admin privileges
async function isAdminUser(userAddress) {
    try {
        const result = await contract.methods.isAdminUser(userAddress).call();
        console.log('Is admin:', result);
    } catch (error) {
        console.error('Error checking admin privileges:', error);
    }
}

// const input = document.querySelector('.typing-input');
//     input.addEventListener('focus', startTypingAnimation);
//     input.addEventListener('blur', stopTypingAnimation);

//     function startTypingAnimation() {
//         input.classList.add('typing-animation');
//     }

//     function stopTypingAnimation() {
//         input.classList.remove('typing-animation');
//     }
// // Usage examples
// grantAdminPrivileges('ADMIN_ADDRESS');
// revokeAdminPrivileges('ADMIN_ADDRESS');
// updatePatientInfo('PATIENT_ADDRESS', 'John', 'Doe', 1234567890, 1, 123);
// getPatientInfo('PATIENT_ADDRESS');
// isAdminUser('USER_ADDRESS');

