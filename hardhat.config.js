require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
    },
  },
  gasReporter: {
    currency: "CHF",
    gasPrice: 21,
    enabled: false,
  },
};
