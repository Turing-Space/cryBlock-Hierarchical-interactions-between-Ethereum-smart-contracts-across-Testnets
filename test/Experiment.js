var Custodian = artifacts.require("./experiment/Custodian.sol");
// var Client = artifacts.require("./Client.sol");

function getNow() {
    return new Date().getTime(); // Return sth that uses 0.001 second as unit
}

function getTimeDiff(startTime) {
    var diff = getNow() - startTime;
    console.log("Time Difference: ", diff);
    return diff;
}

contract('Custodian', function(accounts) {
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
    it("ropsten test", async function() {

        var start_ts = getNow();

        var instance = await Custodian.new();
        console.log(instance);

        getTimeDiff(start_ts);

    });
});