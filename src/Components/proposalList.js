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
      <div>total No. of Proposals: {proposalCount}</div>
      <button onClick={getProposals}>Get proposals</button>
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
          </ul>
        </div>
      ))}
    </div>
  );
}
