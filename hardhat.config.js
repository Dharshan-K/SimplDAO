/** @format */

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.ALCHEMY_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  namedAccounts:{
    deployer:{
    default:0,
      1:0,
    },
  },
  networks:{
    goerli:{
      url: GOERLI_RPC_URL,
      accounts:[GOERLI_PRIVATE_KEY],
      chainId: 5,
    }
  }
}
