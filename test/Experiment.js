var Custodian = artifacts.require("./experiment/Custodian.sol");
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

var NUM_TEST = 10;

var EXPERIMENT_NAME = "Exp #4 Client (10) Deployment Latency";
var TESTNET = "Kovan";

contract('Custodian', function(accounts) {
    
    it(EXPERIMENT_NAME, async function() {

        console.log(EXPERIMENT_NAME + " on <" + TESTNET + ">");

        var custodianInstance = await Custodian.deployed();

        var start_ts;
        var exp_list = [];

        for (var i = 0; i < NUM_TEST; i++) {
            start_ts = getNow();
            // var instance = await Custodian.new();   // Create new instance
            var clientInstance = await custodianInstance.createClientBatch(10);
            time_diff = getTimeDiff(start_ts);      // Calculate diff
            exp_list.push(time_diff);
        }

        console.log(exp_list);

        writeToCsv(TESTNET + "_" + EXPERIMENT_NAME, exp_list);

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