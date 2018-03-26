pragma solidity ^0.4.13;

// import "./contracts/Manager.sol" as ManagerContract;
import * as ManagerContract from "./Manager.sol";


contract Staff {

    mapping (uint256 => uint256) public taskList;  // ID --> Value; ID starts from 0, Value is random from [0 - 1000)
    address public managerAddr;
    uint256 maxNumTask = 3;
    uint256 updateNum; 

    function Staff(address _creatorAddr) public {
        managerAddr = _creatorAddr;
    }

    function setTaskData(uint256 _id, uint256 _data) public returns (bool success) {
        // Set task data ONLY when there are differences between the news and the olds
        if (_data != taskList[_id]){
            taskList[_id] = _data;
            updateNum = updateNum + 1;
            return true;
        } else {
            return false;
        }
    }
    
    function reportTask(uint256 _id) public {
        ManagerContract.Manager manager = ManagerContract.Manager(managerAddr);
        assert(manager.updateTaskList(_id, taskList[_id]));
    }
    
    function reportAll() public returns (bool success) {
        // Report all ONLY when all tasks are updated
        if (updateNum == maxNumTask) {
            for (uint i = 0; i < maxNumTask; i++) {
                reportTask(i);
            }
            updateNum = 0;
            return true;
        } else {
            return false;
        }
    }
    
}

