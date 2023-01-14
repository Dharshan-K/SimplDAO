/** @format */

const { network, deployments, getNamedAccounts, ethers } = require("hardhat");
const ABI_FILE = "../constants/abi.json";
const CONTRACT_ADDRESS_FILE = "../constants/contractAddress.json";
const NFT_ABI_FILE = "../constants/nftabi.json";
const NFT_CONTRACT_ADDRESS_FILE = "../constants/NFTcontractAddress.json";
const fs = require("fs");
require("dotenv").config();

module.exports = async function () {
  const { deployer } = await getNamedAccounts({
    getNamedAccounts,
    deployments,
  });
  console.log("deploying contract.......");
  console.log("deployer is......", deployer);
  const { deploy, log } = deployments;
  const daoContract = await deploy("SimplDAO", {
    from: deployer,
  });
  const daoNFT = await deploy("SimplNFT", {
    from: deployer,
  });

  console.log(daoContract.address);
  console.log(daoNFT.address);
  console.log(network.name);

  const daoContractDeployed = await ethers.getContract("SimplDAO");
  const nftContractDeployed = await ethers.getContract("SimplNFT");

  fs.writeFileSync(
    ABI_FILE,
    daoContractDeployed.interface.format(ethers.utils.FormatTypes.json)
  );
  console.log("updating ADDRESS-------------");
  const chainId = network.config.chainId.toString();
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, "{}");
  const currentAddresses = JSON.parse(
    fs.readFileSync(CONTRACT_ADDRESS_FILE, "utf8")
  );
  console.log("updating ADDRESS-------------");
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(daoContractDeployed.address)) {
      currentAddresses[chainId].push(daoContractDeployed.address);
    }
  }
  {
    currentAddresses[chainId] = [daoContractDeployed.address];
  }
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, JSON.stringify(currentAddresses));

  fs.writeFileSync(
    NFT_ABI_FILE,
    nftContractDeployed.interface.format(ethers.utils.FormatTypes.json)
  );
  console.log("updating ADDRESS-------------");
  //   const chainId = network.config.chainId.toString();
  fs.writeFileSync(NFT_CONTRACT_ADDRESS_FILE, "{}");
  const currentNFTAddresses = JSON.parse(
    fs.readFileSync(NFT_CONTRACT_ADDRESS_FILE, "utf8")
  );
  console.log("updating ADDRESS-------------");
  if (chainId in currentNFTAddresses) {
    if (!currentNFTAddresses[chainId].includes(nftContractDeployed.address)) {
      currentNFTAddresses[chainId].push(nftContractDeployed.address);
    }
  }
  {
    currentNFTAddresses[chainId] = [nftContractDeployed.address];
  }
  fs.writeFileSync(
    NFT_CONTRACT_ADDRESS_FILE,
    JSON.stringify(currentNFTAddresses)
  );
};

module.exports.tags = ["all"];
