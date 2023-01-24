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

export default function Excecute(props) {
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

      await daoContract.exceuteProposal(props.id);
      console.log("proposal excecuted");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={voting}>Excecute</button>;
}
