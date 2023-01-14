/** @format */

const { assert, expect } = require("chai");
const { getNamedAccounts, network, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");

describe("voting", function () {
  it("creating proposal", async function () {
    const { deployer } = await getNamedAccounts();
    console.log("deploying contract.......");
    console.log("deployer is......", deployer);
    await deployments.fixture(["all"]);
    const daoContract = await ethers.getContract("SimplDAO", deployer);
    console.log(network.config.chainId);
    await daoContract.createProposal(
      "Proposal 1",
      "this is about Proposal one"
    );
    const proposalCount = await daoContract.getProposalCount();
    const proposal = await daoContract.getProposal(0);
    expect(proposal[1]).to.equal("Proposal 1");
    expect(proposal[2]).to.equal("this is about Proposal one");
    expect(proposalCount).to.equal(1);
    console.log("test completed");
  });
});
