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

  function getRamdomNumber() returns (uint256) {
        return uint256(keccak256(seed));
    }

  function changeSeed(uint256 new_seed) public{
      seed = new_seed;
  }
  
  function getSeed() view onlyCreater(msg.sender) returns (uint256){
      return seed;
  }
  
}
