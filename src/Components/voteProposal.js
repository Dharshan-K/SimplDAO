/** @format */
import {
  contractAddress,
  abi,
  NFTcontractAddress,
  NFT_ABI,
} from "../constants/index";
import { ethers, Contract } from "ethers";

export default function VoteProposal() {
  const voting = async (event) => {
    try {
      event.preventDefault();
      const title = event.target.title.value;
      const description = event.target.description.value;
      const { ethereum } = window;
      console.log("reading ethereum details......");
      let chainID = await ethereum.request({ method: "eth_chainId" });
      chainID = parseInt(chainID);

      const daoContractAddress =
        chainID in contractAddress ? contractAddress[chainID][0] : null;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const daoContract = new Contract(daoContractAddress, abi, signer);
      console.log(event.target.vote.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form method="post" onSubmit={voting}>
        <input type="radio" id="yes" value="yes" name="vote"></input>
        <label>yes</label>
        <input type="radio" id="no" value="no" name="vote"></input>
        <label>no</label>
        <input type="submit" id="submit"></input>
      </form>
    </div>
  );
}
