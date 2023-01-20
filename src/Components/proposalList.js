/** @format */
import {
  contractAddress,
  abi,
  NFTcontractAddress,
  NFT_ABI,
} from "../constants/index";
import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ProposalList() {
  const [proposalList, setProposalList] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);

  const getProposals = async () => {
    try {
      const { ethereum } = window;
      const proposalArray = [];
      console.log("reading ethereum details......");
      let chainID = await ethereum.request({ method: "eth_chainId" });
      chainID = parseInt(chainID);

      const daoContractAddress =
        chainID in contractAddress ? contractAddress[chainID][0] : null;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const daoContract = new Contract(daoContractAddress, abi, signer);
      //   await daoContract.createProposal("Proposal 1", "This is proposal 1");
      console.log("getting proposals ..........");

      // var proposal1 = await daoContract.getProposal(0);
      // console.log("ptoposal tite", proposal1["ProposalID"]);
      var Count = parseInt(await daoContract.getProposalCount());
      console.log("total No. of Proposals: ", parseInt(proposalCount));
      setProposalCount(Count);
      for (let i = 0; i < Count; i++) {
        const proposalData = await daoContract.getProposal(i);
        proposalArray.push(proposalData);
      }
      setProposalList(proposalArray);
      console.log(proposalList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getProposals();
  });

  return (
    <div>
      <div className="flex flex-row">
        <ul className="mr-6">
          <span className="bg-green-400 text-white font-bold  px-3 py-2 rounded">
            Total No. of Proposals: {proposalCount}
          </span>
        </ul>
        <ul className="mr-6">
          <Link
            className="bg-green-400 hover:bg-green-500 text-white font-bold rounded px-4 py-2"
            to={`createProposal`}
          >
            Create Proposal
          </Link>
        </ul>
        <ul className="mr-6">
          <button
            className="bg-green-400 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
            onClick={getProposals}
          >
            Refresh
          </button>
        </ul>
      </div>
      {proposalList.map((p, index) => (
        <div className="bg-orange-600 ml-2">
          <ul key={index}>
            <li>{p.proposalTitle}</li>
            <li>{p.proposalDescription}</li>
            <li>{p.createdBy}</li>
            <li>For the Proposal: {p.yesVotes.toString()}</li>
            <li>Against the Proposal: {p.noVotes.toString()}</li>
            <li>
              {p.excecuted == true ? (
                <span>Excecuted</span>
              ) : (
                <span>Not Excecuted</span>
              )}
            </li>
            <li>{index}</li>
          </ul>
          <Link to={`voteProposal/${index}`}>Vote</Link>
        </div>
      ))}
    </div>
  );
}
