var Custodian = artifacts.require("./Custodian.sol");
// var Client = artifacts.require("./Client.sol");
var fs = require('fs');

function getNow() {
    return new Date().getTime(); // Return sth that uses 0.001 second as unit
}

function getTimeDiff(startTime) {
    var diff = getNow() - startTime;
    console.log("Time Difference: ", diff);
    return diff;
}

function writeToCsv(csv_file_name, data_arr) {
    var file = fs.createWriteStream("experiments/" + csv_file_name + ".csv");
    file.on('error', function(err) { console.log("csv file export error"); });
    file.write(data_arr.join(', ') + '\n');    
    file.end();
}

function writeToCsvMatrix(csv_file_name, data_matrix) {
    var file = fs.createWriteStream("experiments/" + csv_file_name + ".csv");
    file.on('error', function(err) { console.log("csv file export error"); });
    data_matrix.forEach(function(v) { file.write(v.join(', ') + '\n'); }); 
    file.end();
}




// ##################### EXPERIMENT SETUPS ##################### //
var EXPERIMENT_NAME = "Exp #7 SetSeedBatch (10) Latency";
var TESTNET = "Ropsten";
var NUM_TEST = 10;


// ##################### CONTRACT ADDRESS ##################### //
var CUSTODIAN_ADDRESS = "0x48485856d3778bc1ed9837f4c09ccd59a90ed57a"; // Ropsten
// var CUSTODIAN_ADDRESS = "0x8a916a01cf632b5980a8b525f85d7a6da689658a"; // Rinkeby
// var CUSTODIAN_ADDRESS = "0xb458781ac460d23a0ea3820b1ea1a684747ddd01"; // Kovan


// ##################### CONTRACT TEST ##################### //
contract('Custodian', function(accounts) {
    it(EXPERIMENT_NAME, async function() {
        console.log(EXPERIMENT_NAME + " on <" + TESTNET + ">");


        // ##################### CUSTODIAN (DEPLOYED / NEW) ##################### //
        var custodianInstance = await Custodian.at(CUSTODIAN_ADDRESS);
        // var custodianInstance = await Custodian.deployed();
        // var custodianInstance = await Custodian.new();


        // ##################### (Optional) CREATE CLIENTS BATCH ##################### //
        // for (var i = 0; i < 20; i++) {
        //     await custodianInstance.createClientBatch(10);
        //     console.log(i);
        // } 

        // Check Volume
        var volume = await custodianInstance.volume.call();
        console.log(volume.toNumber());       

        // Inits
        var start_ts;
        var exp_list = [];
        var gas_list = [];



        // ##################### TEST INITIALIZATION BEGIN ##################### //
        // temp_experiment_name = ["Exp #5 SetSeedBatch (1) Latency","Exp #6 SetSeedBatch (5) Latency","Exp #7 SetSeedBatch (10) Latency","Exp #8 SetSeedBatch (20) Latency","Exp #9 SetSeedBatch (50) Latency","Exp #10 SetSeedBatch (100) Latency"]
        temp_experiment_name = ["Exp #5 SetSeedBatch (1) Latency"]
        temp_batch_size = [1]
        temp_iteration = 1;
        // ##################### TEST INITIALIZATION END ##################### //


        for (var j=0;j<temp_iteration;j++) {
            exp_list = [];
            gas_list = [];

            for (var i = 0; i < NUM_TEST; i++) {
                start_ts = getNow();
                

                // ##################### MAIN EXECUTION TESTING BEGIN ##################### //
                let receiptSource = await custodianInstance.setSeedBatch(i, temp_batch_size[j]); // XXX
                // await custodianInstance.setSeedBatch(i, 10); // OOO
                // ##################### MAIN EXECUTION TESTING END ##################### //
                

                time_diff = getTimeDiff(start_ts);      // Calculate diff
                exp_list.push(time_diff);

                var gasUsed = receiptSource.receipt.gasUsed;
                gas_list.push(gasUsed);
                console.log(gasUsed);
                
            }
            console.log(exp_list);
            console.log(gas_list);

            // ##################### FILE WRITER ##################### //
            // writeToCsv(TESTNET + "_" + temp_experiment_name[j], exp_list); // XXX    
            writeToCsvMatrix(TESTNET + "_" + temp_experiment_name[j], [exp_list, gas_list]);
            // writeToCsv(TESTNET + "_" + EXPERIMENT_NAME, exp_list); // OOO
        }

    }).timeout(999999999999);


    // it("ropsten test", async function() {

    //     var instance = await Custodian.deployed();

    //     var start_ts = getNow();

    //     var volume = await instance.volume.call();
    //     console.log(volume);

    //     // for (var i = 0; i < 100; i++) {
    //     //     var client = await instance.createClientBatch(10);
    //     // }

    //     var time_diff = getTimeDiff(start_ts);
    //     console.log("time_diff: ", time_diff);

        

    // }).timeout(999999999999);


    // it("first test", async function() {
    //     var instance = await Custodian.deployed();
    //     console.log(instance);

    //     var seed = await instance.getSeed();
    //     assert.equal(seed, 0);
    //     console.log("seed: ", seed.toNumber());

    //     var client = await instance.createClient();
    //     console.log(client);

    //     var volume = await instance.volume.call();
    //     console.log("volume: ", volume.toNumber());
    // });
});