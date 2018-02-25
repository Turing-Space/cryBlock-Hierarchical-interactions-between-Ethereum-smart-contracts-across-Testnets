var Migrations = artifacts.require("./Migrations.sol");
var Custodian = artifacts.require("./Custodian.sol");
var Client = artifacts.require("./Client.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Custodian);
  deployer.deploy(Client);
};
