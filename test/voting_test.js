/** @format */

const { assert, expect } = require("chai");
const { getNamedAccounts, network, deployments, ethers } = require("hardhat");
// import { NFTcontractAddress } from "./constants/index";
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");

describe("voting", function () {
  it("creating proposal", async function () {
    const NFTcontractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const { deployer } = await getNamedAccounts();
    console.log("deploying contract.......");
    console.log("deployer is......", deployer);
    await deployments.fixture(["all"]);
    const daoContract = await ethers.getContract("SimplDAO", deployer);
    const daoNftContrat = await ethers.getContract("SimplNFT", deployer);
    console.log(network.config.chainId);
    await daoContract.createProposal(
      "Proposal 1",
      "this is about Proposal one"
    );
    const proposalCount = await daoContract.getProposalCount();
    await daoNftContrat.mint(1000);
    console.log(
      await daoContract.voteProposal(
        0,
        1,
        "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
      )
    );

    const proposal = await daoContract.getProposal(0);
    console.log(proposal);
    expect(proposalCount).to.equal(1);
    console.log("test completed");
  });
});
