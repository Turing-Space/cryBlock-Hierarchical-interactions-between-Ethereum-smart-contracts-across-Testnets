pragma solidity ^0.4.13;

contract Staff {

    mapping (uint256 => uint256) public taskList;
    address public managerAddr;

    function Staff(address _creatorAddr) public {
        managerAddr = _creatorAddr;
    }

    function setTaskData(uint256 _id, uint256 _data) public returns (bool success) {
        taskList[_id] = _data;
        return true;
    }
    
    function reportTask(uint256 _id) public {
        Manager manager = Manager(managerAddr);
        assert(manager.updateTaskList(_id, taskList[_id]));
    }
    
}

contract Manager {

    uint256 public volume;   // total volume of Staffs
    address public owner;
    mapping (uint256 => uint256) public taskList;
    mapping (uint256 => address) staffs;   // store Staff IDs --> Staff addresses

    /** Internal functions **/
    function getNextID() internal returns (uint256) {
        volume = volume + 1;   // Increment total volume
        return volume;
    }
    /************************/

    
    // Constructor
    function Custodian() public {
        volume = 0;
        owner = msg.sender;
    }

    // Staff hiring
    function hireStaff() public returns (uint256) {
        uint256 staffID = getNextID();
        address staffAddr = new Staff(this);
        staffs[staffID] = staffAddr;
        return staffID;
    }


    function getStaffAddrByID(uint256 staffID) public view returns (address) {
        return staffs[staffID];
    }
    
    function updateTaskList(uint256 _id, uint256 _data) public returns (bool success) {
        taskList[_id] = _data;
        return true;
    }
    
    function changeOwner(address newOwner) public {
        owner = newOwner;
    }
}