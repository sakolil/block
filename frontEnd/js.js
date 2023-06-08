const Web3 = require('web3');
var AES = require("crypto-js/aes");
var pubKey = "VeryGoodKey"

// Update with the contract ABI and address
const contractABI = ["..."]; // Replace with the ABI of the PatientRegistry contract
const contractAddress = 'CONTRACT_ADDRESS'; // Replace with the address of the deployed PatientRegistry contract

// Connect to the Ethereum network
const web3 = new Web3('WEB3_PROVIDER_URL'); // Replace with your Ethereum provider URL

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

// Get patient information
async function getPatientInfo(patientAddress) {
    try {
        const result = await contract.methods.getPatient(patientAddress).call();
        console.log('Patient information:', result);
    } catch (error) {
        console.error('Error getting patient information:', error);
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

const input = document.querySelector('.typing-input');
    input.addEventListener('focus', startTypingAnimation);
    input.addEventListener('blur', stopTypingAnimation);

    function startTypingAnimation() {
        input.classList.add('typing-animation');
    }

    function stopTypingAnimation() {
        input.classList.remove('typing-animation');
    }
// // Usage examples
// grantAdminPrivileges('ADMIN_ADDRESS');
// revokeAdminPrivileges('ADMIN_ADDRESS');
// updatePatientInfo('PATIENT_ADDRESS', 'John', 'Doe', 1234567890, 1, 123);
// getPatientInfo('PATIENT_ADDRESS');
// isAdminUser('USER_ADDRESS');

