var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "force pistol endless treat spot craft easily panel hurt potato slide explain";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/lMgQfS5DDh31T0z6iD5E")
      },
      network_id: 3,
      gas: 4612388,
      // from: "0x9BDe18763610E7beEE45F522B641F156D538d901"
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/lMgQfS5DDh31T0z6iD5E")
      },
      network_id: 4,
      gas: 4612388,
      // from: "0x9BDe18763610E7beEE45F522B641F156D538d901"
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/lMgQfS5DDh31T0z6iD5E")
      },
      network_id: 44,
      gas: 4612388,
      // from: "0x9BDe18763610E7beEE45F522B641F156D538d901"
    },
  }
};