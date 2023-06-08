// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PatientRegistry {
    struct Patient {
        string name;
        string lastName;
        uint256 dob;
        uint8 gender;  // 0 - Unknown, 1 - Male, 2 - Female, 3 - Other
        uint256 id;
    }
    
    address private admin;
    mapping(address => bool) private isAdmin;
    mapping(uint256 => address) private patientAddresses;
    mapping(address => Patient) private patients;
    
    event PatientRegistered(address patientAddress, uint256 id);
    event PatientInfoUpdated(address patientAddress, uint256 id);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        isAdmin[admin] = true;
    }
    
    function addAdmin(address _admin) public onlyAdmin {
        isAdmin[_admin] = true;
    }
    
    function removeAdmin(address _admin) public onlyAdmin {
        require(_admin != admin, "Cannot remove the main admin");
        isAdmin[_admin] = false;
    }
    
    function registerPatient(string memory name, string memory lastName, uint256 dob, uint8 gender, uint256 id) public onlyAdmin {
        require(patients[patientAddresses[id]].id == 0, "Patient already registered");
        require(patientAddresses[id] == address(0), "Patient ID already taken");
        
        patients[msg.sender] = Patient(name, lastName, dob, gender, id);
        patientAddresses[id] = msg.sender;
        
        emit PatientRegistered(msg.sender, id);
    }
    
    function updatePatientInfo(address patientAddress, string memory name, string memory lastName, uint256 dob, uint8 gender, uint256 id) public onlyAdmin {
        require(patientAddresses[id] == patientAddress, "Invalid patient ID");
        require(patients[patientAddress].id != 0, "Patient not found");
        
        patients[patientAddress].name = name;
        patients[patientAddress].lastName = lastName;
        patients[patientAddress].dob = dob;
        patients[patientAddress].gender = gender;
        
        emit PatientInfoUpdated(patientAddress, id);
    }
    
    function getPatient(address patientAddress) public view returns (string memory name, string memory lastName, uint256 dob, uint8 gender, uint256 id) {
        require(patients[patientAddress].id != 0, "Patient not found");
        
        Patient memory patient = patients[patientAddress];
        return (patient.name, patient.lastName, patient.dob, patient.gender, patient.id);
    }
    
    function isAdminUser(address userAddress) public view returns (bool) {
        return isAdmin[userAddress];
    }
}