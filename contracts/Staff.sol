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