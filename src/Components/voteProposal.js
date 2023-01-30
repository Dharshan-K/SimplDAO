/** @format */
import { contractAddress, abi, NFTcontractAddress } from "../constants/index";
import { ethers, Contract } from "ethers";
import { useParams } from "react-router-dom";

export default function VoteProposal() {
  let voteChoice;
  let proposalId = useParams();
  const eventHandler = async (event) => {
    event.preventDefault();
    let value = event.target.getAttribute("vote");
    console.log("voting started for", proposalId.id);
    if (value == "yes") {
      console.log("it is yes");
      voteChoice = 0;
    } else if (value == "no") {
      console.log("it is no");
      voteChoice = 1;
    }

    console.log("final" + " " + voteChoice);
    await voting();
    console.log("polling completed");
  };
  const voting = async (vote) => {
    const { ethereum } = window;
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    const votingAddress =
      chainId in contractAddress ? contractAddress[chainId][0] : null;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(votingAddress);
      const votingContract = new Contract(votingAddress, abi, signer);
      console.log("Inside vote process" + " " + voteChoice);
      await votingContract.voteProposal(
        proposalId.id,
        voteChoice,
        NFTcontractAddress[chainId][0]
      );
    }
    console.log("excecution finished");
  };

  return (
    <div>
      <button onClick={eventHandler} vote="yes">
        Vote for
      </button>
      <button onClick={eventHandler} vote="no">
        Vote Against
      </button>
    </div>
  );
}
