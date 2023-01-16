/** @format */

import {
  contractAddress,
  abi,
  NFTcontractAddress,
  NFT_ABI,
} from "../constants/index";
import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
export default function ProposalList() {
  const [proposalList, setProposalList] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);

  const getProposals = async () => {
    try {
      const { ethereum } = window;
      console.log("reading ethereum details......");
      let chainID = await ethereum.request({ method: "eth_chainId" });
      chainID = parseInt(chainID);

      const daoContractAddress =
        chainID in contractAddress ? contractAddress[chainID][0] : null;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const daoContract = new Contract(daoContractAddress, abi, signer);
      //   await daoContract.createProposal("Proposal 1", "This is proposal 1");
      console.log("getting proposal 1..........");
      var proposal1 = await daoContract.getProposal(0);
      console.log(proposal1);
      var Count = parseInt(await daoContract.getProposalCount());
      console.log("total No. of Proposals: ", parseInt(proposalCount));
      setProposalCount(Count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProposals();
    console.log("final number of proposals", proposalCount);
  });

  return (
    <div>
      <div>total No. of Proposals: {proposalCount}</div>
    </div>
  );
}
