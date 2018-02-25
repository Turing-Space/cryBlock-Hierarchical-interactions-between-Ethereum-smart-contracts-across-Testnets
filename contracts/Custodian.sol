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
    function getClientAddrByID(uint256 clientID) public view returns (address) {
        return clients[clientID];
    }

    function setSeed(uint256 new_seed) onlyOwner(msg.sender) {
        seed = new_seed;
        if (volume >= 1) {
            for (var i = 1; i <= volume; i++) {
                setSeedByAddress(getClientAddrByID(i), new_seed);
            }
        }
    }
    
    function setSeedByAddress(address clientAddress, uint256 new_seed) internal onlyOwner(msg.sender) returns (bool success) {
        Client client = Client(clientAddress);
        client.changeSeed(new_seed);
        
        return true;
    }

    function changeOwner(address new_owner) onlyOwner(msg.sender) {
        owner = new_owner;
    }
}
