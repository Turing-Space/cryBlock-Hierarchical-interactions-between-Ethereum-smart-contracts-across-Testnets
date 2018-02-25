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


contract Custodian {

    uint256 public volume;   // total volume of Clients
    mapping (uint256 => address) clients;   // store Client IDs --> Client addresses
    uint256 seed;
    address owner;

    event CreateClient(uint256 id, address new_address);

    modifier onlyOwner(address sender){
        require(sender == owner);
        _;
    }
    
    // Constructor
    function Custodian() public {
        volume = 0;
        owner = msg.sender;
    }

    // Get Available ID
    function getNextID() returns (uint256) {
        volume = volume + 1;   // Increment total volume
        return volume;
    }
    
    // Client creater
    function createClient() public returns (uint256) {
        var clientID = getNextID();
        address clientAddress = new Client(seed , msg.sender);
        clients[clientID] = clientAddress;
        CreateClient(clientID, clientAddress);

        return clientID;
    }

    // Return Client address
    function getClientAddrByID(uint256 clientID) public returns (address) {
        return clients[clientID];
    }

    function setSeed(uint256 new_seed) onlyOwner(msg.sender) {
        seed = new_seed;

        // update seed for all client contracts
        bytes4 hashOfFunct = bytes4(keccak256("changeSeed(uint256 new_seed)"));
        for(var i=1;i<=volume;i++) {
            getClientAddrByID(i).delegatecall(hashOfFunct, new_seed);
        }
        
    }

    function changeOwner(address new_owner) onlyOwner(msg.sender) {
        owner = new_owner;
    }
}