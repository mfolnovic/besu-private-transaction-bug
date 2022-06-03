const SimpleStorageFactory = artifacts.require("./SimpleStorageFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorageFactory);
};
