/** @format */

import { contractAddress, abi } from "../constants/index";
import { ethers, Contract } from "ethers";

export default function CreateProposal() {
  const proposalForm = async (event) => {
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
      await daoContract.createProposal(title, description);
      console.log("proposal created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form method="post" onSubmit={proposalForm}>
        <label>Title : </label>
        <input type="text" id="title"></input>
        <label>Description : </label>
        <input type="text" id="description"></input>
        <button>
          <input type="submit" value="submit"></input>
        </button>
      </form>
    </div>
  );
}
