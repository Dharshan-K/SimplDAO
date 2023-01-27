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
import Excecute from "./excecuteProposal";
import MintNFT from "./mintNFT";
export default function ProposalList() {
  const [proposalList, setProposalList] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);
  const styles = {
    button: `bg-white-400 text-black border border-green-400 hover:bg-green-400 hover:text-white  px-4 py-2 rounded w-40 flex-none`,
    badge: ``,
  };

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

  const voting = async () => {
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

      await daoContract.excecuteProposal();
      console.log("voting");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getProposals();
  });

  return (
    <div>
      <div className="grid grid-cols-3 max-w-96">
        <div className="bg-green-400 text-white font-bold px-3 py-2 rounded mr-6 w-40 flex-none">
          <span className="">Total Proposals: {proposalCount}</span>
        </div>
        <div className={styles.button}>
          <Link className="w-30" to={`createProposal`}>
            Create Proposal
          </Link>
        </div>
        <div className="mr-6">
          <button className={styles.button} onClick={getProposals}>
            Refresh
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-10 w-300">
        {proposalList.map((p, index) => (
          <div className="">
            <div key={index} className="bg-white-600 ml-2 flex flex-col">
              <span></span>
              <span className="flex-wrap">
                <span className="font-bold">Title: </span> {p.proposalTitle}
              </span>

              <span className="flex-wrap">
                <span className="font-bold">Description : </span>
                {p.proposalDescription}
              </span>

              <span className="flex-wrap text-sm">
                <span className="font-bold">Owner : </span>
                {p.createdBy}
              </span>
              <span className="flex-wrap">
                <span className="font-bold">For the Proposal:</span>{" "}
                {p.yesVotes.toString()}
              </span>
              <span className="flex-wrap">
                <span className="font-bold">Against the Proposal: </span>{" "}
                {p.noVotes.toString()}
              </span>
              <span className="flex-wrap">
                <span className="font-bold">Status: </span>
                {p.excecuted == true ? (
                  <span>Excecuted</span>
                ) : (
                  <span>Not Excecuted</span>
                )}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5 ml-5">
              <div className="col-start-1 col-end-3">
                <Excecute id={index} />
              </div>
              <br></br>
              <div className="bg-green-400 hover:bg-green-700 text-white font-bold px-4 py-2 rounded flex-wrap w-15 col-end-7 col-span-2 mr-10">
                <Link to={`voteProposal/${index}`}>Vote</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br></br>
    </div>
  );
}
