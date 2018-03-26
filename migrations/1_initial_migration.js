var Migrations = artifacts.require("./Migrations.sol");
var Custodian = artifacts.require("./Custodian.sol");
var Manager = artifacts.require("./Manager.sol");
var Staff = artifacts.require("./Staff.sol");
// var Client = artifacts.require("./Client.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Custodian);
  deployer.deploy(Manager);
  deployer.deploy(Staff);
  // deployer.deploy(Client);
};
