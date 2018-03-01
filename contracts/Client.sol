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

    /** Internal functions **/
    // function getRamdomNumber() internal view returns (uint256) {
    //     return uint256(keccak256(seed));
    // }
    /************************/

    function getRamdomNumberTimeDepend() public view returns (uint256) {
        return uint(block.blockhash(block.number-1))%10 + 1;
    }

    function getRamdomNumberSeedDepend(uint256 max) public returns (uint256) {
        // First Time
        if (randomState == 0) {
            randomState = uint256(keccak256(keccak256(seed)));
        } else {
            randomState = uint256(keccak256(keccak256(randomState)));
        }
        return uint256(randomState) % max + 1;
    }

    // Constructor
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