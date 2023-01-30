/** @format */

import { contractAddress, abi } from "../constants/index";
import { ethers, Contract } from "ethers";

export default function Excecute(props) {
  const voting = async () => {
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

      await daoContract.exceuteProposal(props.id);
      console.log("proposal excecuted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-white-400
      hover:bg-green-400
      border
      border-green-400
      hover: text-white
      text-black
      font-bold
      px-4
      py-2
      rounded
      flex-wrap
      max-w-28
      hover:max-w-sm"
      onClick={voting}
    >
      Excecute
    </button>
  );
}
