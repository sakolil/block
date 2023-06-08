window.addEventListener('DOMContentLoaded', async () => {
    // Check if web3 is available
    if (typeof web3 !== 'undefined') {
        // Use the existing web3 provider (e.g., MetaMask)
        web3 = new Web3(web3.currentProvider);
    } else {
        // Handle the case where web3 is not available
        // You can display an error message or prompt the user to install MetaMask
        console.log('Please install MetaMask or use a web3-enabled browser.');
        return;
    }
    
    // Contract ABI (Application Binary Interface)
    const contractABI = [
        // Contract's ABI here
    ];
    
    // Contract address
    const contractAddress = 'CONTRACT_ADDRESS';
    
    // Create an instance of the contract
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    
    // Example function to call the contract's registerPatient
    async function registerPatient(name, lastName, dob, gender, id) {
        // Convert string to bytes32 for Solidity compatibility
        const nameBytes32 = web3.utils.utf8ToHex(name);
        const lastNameBytes32 = web3.utils.utf8ToHex(lastName);
        
        // Call the contract's registerPatient function
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerPatient(nameBytes32, lastNameBytes32, dob, gender, id).send({ from: accounts[0] });
        
        console.log('Patient registered successfully!');
    }
    
    // Example usage of the registerPatient function
    document.getElementById('registration-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('last-name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const id = document.getElementById('id').value;
        
        await registerPatient(name, lastName, dob, gender, id);
    });
});