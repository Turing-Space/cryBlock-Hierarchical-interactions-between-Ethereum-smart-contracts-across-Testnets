# Code Base for Hierarchical interactions between Ethereum smart contracts across Testnets
Paper accepted by [CryBlock](http://www.cryblock.org) 2018, held by the 16th ACM International Conference on Mobile Systems, Applications, and Services in Munich, Germany. 

# Installation
```
npm i
```
# Setup wallet
Make sure your metamask wallet has money at the testnet you are going to use
Change the following to your mnemonic codes
```
var mnemonic = "force pistol endless treat spot craft easily panel hurt potato slide explain";
```

# Reproduce experiments (auto file generating)
### Go to /test/Experiment.js
1. Set up experiment title, testnet and number of tests per experiment
```
// ##################### EXPERIMENT SETUPS ##################### //
var EXPERIMENT_NAME = "Exp #7 SetSeedBatch (10) Latency";
var TESTNET = "Kovan";
var NUM_TEST = 10;
```
2. Change the contract address to the corresponding address on testnet
```
// ##################### CONTRACT ADDRESS ##################### //
// var CUSTODIAN_ADDRESS = "0x48485856d3778bc1ed9837f4c09ccd59a90ed57a"; // Ropsten
// var CUSTODIAN_ADDRESS = "0x8a916a01cf632b5980a8b525f85d7a6da689658a"; // Rinkeby
var CUSTODIAN_ADDRESS = "0xb458781ac460d23a0ea3820b1ea1a684747ddd01"; // Kovan
```
3. Decide whether using the new custodian or the old one
```
// ##################### CUSTODIAN (DEPLOYED / NEW) ##################### //
var custodianInstance = await Custodian.at(CUSTODIAN_ADDRESS);
// var custodianInstance = await Custodian.deployed();
// var custodianInstance = await Custodian.new();
```
4. Create hundreds of client contract upfront (Optional, comment out if not necessary)
```
// ##################### (Optional) CREATE CLIENTS BATCH ##################### //
for (var i = 0; i < 20; i++) {
    await custodianInstance.createClientBatch(10);
    console.log(i);
}
```
5. DO YOUR EXPERIMENT HERE!!!
```
// ##################### TEST INITIALIZATION BEGIN ##################### //
temp_experiment_name = ["Exp #5 SetSeedBatch (1) Latency","Exp #6 SetSeedBatch (5) Latency","Exp #7 SetSeedBatch (10) Latency","Exp #8 SetSeedBatch (20) Latency","Exp #9 SetSeedBatch (50) Latency","Exp #10 SetSeedBatch (100) Latency"]
temp_batch_size = [1,5,10,20,50,100]
temp_iteration = 6;
// ##################### TEST INITIALIZATION END ##################### //
```
6. Customize your file write (Optional)
```
// ##################### FILE WRITER ##################### //
writeToCsv(TESTNET + "_" + temp_experiment_name[j], exp_list); // XXX     
// writeToCsv(TESTNET + "_" + EXPERIMENT_NAME, exp_list); // OOO
```
7. Start the experiment
```
truffle test --network <kovan>
```



# Usage (by local nodes) 
1. Open a private Ethereum node

```
ganache-cli
```

2. Under this project directory, compile and deploy the contracts
```
truffle compile --reset
truffle migrate
```

3. Run tests 
```
truffle test
```
