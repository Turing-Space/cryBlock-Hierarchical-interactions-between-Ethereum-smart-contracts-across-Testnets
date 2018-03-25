var Manager = artifacts.require("./Manager.sol");
// var Staff = artifacts.require("./Staff.sol");
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


// ##################### EXPERIMENT SETUPS ##################### //
var EXPERIMENT_NAME = "Manager-Staff Test";
var TESTNET = "Ropsten";
var NUM_TEST = 10;

var NUM_OF_STAFF = 5;

// ##################### CONTRACT ADDRESS ##################### //
var MANAGER_ADDRESS = "0x49013c99d9fef010f05b90b919813d18357ba16f"; // Ropsten
// var CUSTODIAN_ADDRESS = "0x8a916a01cf632b5980a8b525f85d7a6da689658a"; // Rinkeby
// var CUSTODIAN_ADDRESS = "0xb458781ac460d23a0ea3820b1ea1a684747ddd01"; // Kovan


// ##################### CONTRACT TEST ##################### //
contract('Manager', function(accounts) {
    it(EXPERIMENT_NAME, async function() {
        // console.log(EXPERIMENT_NAME + " on <" + TESTNET + ">");

        console.log("Enter experiment");


        // ##################### CUSTODIAN (DEPLOYED / NEW) ##################### //
        var managerInstance = await Manager.at(MANAGER_ADDRESS);
        // var custodianInstance = await Custodian.deployed();
        // var custodianInstance = await Custodian.new();

        console.log("Manager instance is ready");

        // ##################### (Optional) CREATE CLIENTS BATCH ##################### //
        for (var i = 0; i < NUM_OF_STAFF; i++) {
            await managerInstance.hireStaff();
            console.log(i);
        }

        // Check Volume
        // var volume = await custodianInstance.volume.call();
        // console.log(volume);       

        // Inits
        // var start_ts;
        // var exp_list = [];

        

        var StaffAddrList = [];
        for (var ID=1; ID < NUM_OF_STAFF+1; ID++){
            StaffAddrList.push(await managerInstance.getStaffAddrByID(ID));
        }

        console.log(StaffAddrList);



        // // ##################### TEST INITIALIZATION BEGIN ##################### //
        // temp_experiment_name = ["Exp #5 SetSeedBatch (1) Latency","Exp #6 SetSeedBatch (5) Latency","Exp #7 SetSeedBatch (10) Latency","Exp #8 SetSeedBatch (20) Latency","Exp #9 SetSeedBatch (50) Latency","Exp #10 SetSeedBatch (100) Latency"]
        // temp_batch_size = [1,5,10,20,50,100]
        // temp_iteration = 6;
        // // ##################### TEST INITIALIZATION END ##################### //


        // for (var j=0;j<temp_iteration;j++) {
        //     exp_list = [];

        //     for (var i = 0; i < NUM_TEST; i++) {
        //         start_ts = getNow();
                

        //         // ##################### MAIN EXECUTION TESTING BEGIN ##################### //
        //         await custodianInstance.setSeedBatch(i, temp_batch_size[j]); // XXX
        //         // await custodianInstance.setSeedBatch(i, 10); // OOO
        //         // ##################### MAIN EXECUTION TESTING END ##################### //
                

        //         time_diff = getTimeDiff(start_ts);      // Calculate diff
        //         exp_list.push(time_diff);
        //     }
        //     console.log(exp_list);


        //     // ##################### FILE WRITER ##################### //
        //     writeToCsv(TESTNET + "_" + temp_experiment_name[j], exp_list); // XXX     
        //     // writeToCsv(TESTNET + "_" + EXPERIMENT_NAME, exp_list); // OOO
        // }

    }).timeout(999999999999);
});