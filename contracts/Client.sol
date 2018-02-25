pragma solidity ^0.4.13;

contract Client {

    address owner;
    address creator;
    uint256 seed;

    modifier onlyCreater(address sender){
        require(sender == creator);
        _;
    }

  // Constructor
  function Client(uint256 _seed, address _creator) {
    seed = _seed;
    creator = _creator;
  }

  function getRamdomNumber(uint256 seed) returns (uint256) {
        return uint256(keccak256(seed));
    }

  function changeSeed(uint256 new_seed) onlyCreater(msg.sender) {
      seed = new_seed;
  }
  
}