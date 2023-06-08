// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedicalDataAccess {
    struct Patient {
        string name;
        string lastName;
        uint256 dob;
        uint8 gender;  
        uint256 id;
        bool hasAccess;
    }
    
    mapping(address => Patient) private patients;
    
    event AccessGranted(address patientAddress);
    
    function registerPatient(string memory name, string memory lastName, uint256 dob, uint8 gender, uint256 id) public {
        require(patients[msg.sender].id == 0, "Patient already registered");
        
        patients[msg.sender] = Patient(name, lastName, dob, gender, id, false);
    }
    
    function grantAccess(address patientAddress) public {
        require(msg.sender == patientAddress, "Only the patient can grant access");
        require(patients[patientAddress].id != 0, "Patient not found");
        require(!patients[patientAddress].hasAccess, "Access already granted");
        
        patients[patientAddress].hasAccess = true;
        emit AccessGranted(patientAddress);
    }
    
    function hasAccess(address patientAddress) public view returns (bool) {
        return patients[patientAddress].hasAccess;
    }
    
    function getPatient(address patientAddress) public view returns (string memory name, string memory lastName, uint256 dob, uint8 gender, uint256 id, bool hasAccess) {
        require(patients[patientAddress].id != 0, "Patient not found");
        
        Patient memory patient = patients[patientAddress];
        return (patient.name, patient.lastName, patient.dob, patient.gender, patient.id, patient.hasAccess);
    }
}