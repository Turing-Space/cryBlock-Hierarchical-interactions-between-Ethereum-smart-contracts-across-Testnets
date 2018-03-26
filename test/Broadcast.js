var Manager = artifacts.require("./Manager.sol");
var Staff = artifacts.require("./Staff.sol");
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
var TESTNET = "Kovan";
var NUM_TEST = 10;

var NUM_OF_STAFF = 5;

// ##################### CONTRACT ADDRESS ##################### //
var MANAGER_ADDRESS = "0x1dd7db7af70403d19f1676329701c958c55b9342"; // Ropsten
// var CUSTODIAN_ADDRESS = "0x8a916a01cf632b5980a8b525f85d7a6da689658a"; // Rinkeby
// var CUSTODIAN_ADDRESS = "0xb458781ac460d23a0ea3820b1ea1a684747ddd01"; // Kovan


// // Task Broadcaster
// class Task {
//     constructor(_id, _staffList = []) { this.id = _id; this.staffList = _staffList; }
//     get id() { this.id; }
//     get staffList() { this.staffList; }

//     broadcastOneStaff(_staffAddr) {
//         return new Promise(function(resolve, reject) {
//             try {
//                 var staffInstance = await Staff.at(_staffAddr);
//                 staffInstance.setTaskData(_id, Math.random()*1000);
//                 resolve(true);
//             } catch (err) {
//                 reject("Broadcast one staff failed: "+ err);
//             }
//         });          
//     }

//     broadcast() { Promise.all(staffList.map((addr) => broadcastOneStaff(addr))).then(console.log); }
// }


// ##################### CONTRACT TEST ##################### //
contract(['Manager', 'Staff'], function(accounts) {


    // Real Test
    it(EXPERIMENT_NAME, async function() {
        // console.log(EXPERIMENT_NAME + " on <" + TESTNET + ">");

        console.log("Enter experiment");



        // Task Broadcaster
        class Task {
            constructor(newId, newStaffList = []) { this._id = newId; this._staffList = newStaffList; }
            get id() { return this._id; }
            set id(newId) { this.id = newId; }

            get staffList() { return this._staffList; }
            set staffList(newStaffList) { this._staffList = newStaffList; }

            broadcastOneStaff(newStaffAddr) {
                return new Promise(function(resolve, reject) {
                    try {
                        var staffInstance = await Staff.at(newStaffAddr);
                        staffInstance.setTaskData(this._id, Math.random()*1000);
                        resolve(true);
                    } catch (err) {
                        reject("Broadcast one staff failed: "+ err);
                    }
                });          
            }

            broadcast() { Promise.all(this._staffList.map((addr) => broadcastOneStaff(addr))).then(console.log); }
        }



        // ##################### CUSTODIAN (DEPLOYED / NEW) ##################### //
        var managerInstance = await Manager.at(MANAGER_ADDRESS);
        // var staffInstance = await Staff.at("0x6002c62aeb2d4c8c9ffd05f3138a904eea140d14");
        // var custodianInstance = await Custodian.deployed();
        // var custodianInstance = await Custodian.new();

        console.log("Manager instance is ready");

        // ##################### (Optional) CREATE CLIENTS BATCH ##################### //
        for (var i = 0; i < NUM_OF_STAFF; i++) {
            await managerInstance.hireStaff();
            console.log(i);
        }

        // Check Volume
        var volume = await managerInstance.volume.call();
        console.log(volume.toNumber());       

        // Inits
        // var start_ts;
        // var exp_list = [];

        
        // NUM_OF_STAFF can be "volume" to maximize the performance
        var StaffAddrList = [];
        for (var ID=1; ID < NUM_OF_STAFF+1; ID++){
            StaffAddrList.push(await managerInstance.getStaffAddrByID(ID));
        }

        console.log(StaffAddrList);



        // Tasks Broadcasting
        var task_1 = new Task(1, StaffAddrList);





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