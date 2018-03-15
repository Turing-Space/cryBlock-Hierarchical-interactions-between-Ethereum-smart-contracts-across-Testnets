pragma solidity ^0.4.13;

contract Client {

    address owner; // currently not in use
    uint256 seed;
    address public creator;
    uint256 randomState = 0;

    event ClientSeedChangedAt(uint256 time);

    modifier onlyCreater(address sender){
        require(sender == creator);
        _;
    }

    function Client(uint256 _seed, address _creator) public {
        seed = _seed;
        creator = _creator;
    }

    function changeSeed(uint256 newSeed) public returns (bool success) {
        seed = newSeed;
        ClientSeedChangedAt(now);
        return true;
    }
  
    function getSeed() public view onlyCreater(msg.sender) returns (uint256) {
        return seed;
    }
}