const Web3 = require('web3');

// Update with the contract ABI and address
const contractABI = ["..."]; // Replace with the ABI of the PatientRegistry contract
const contractAddress = 'CONTRACT_ADDRESS'; // Replace with the address of the deployed PatientRegistry contract

// Connect to the Ethereum network
const web3 = new Web3('WEB3_PROVIDER_URL'); // Replace with your Ethereum provider URL

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to retrieve patient information
async function getPatientInfo(patientAddress) {
    try {
        const result = await contract.methods.getPatient(patientAddress).call();
        console.log('Patient information:', result);
        // You can update the code here to display the patient information on the webpage
    } catch (error) {
        console.error('Error getting patient information:', error);
        // You can update the code here to display an error message on the webpage
    }
}