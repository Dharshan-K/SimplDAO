/** @format */

import { ethers } from "ethers";
import { useState, useEffect } from "react";
// import { abi, nftABI, contractAddress, NFTcontractAddress } from "../constants";

export default function ConnectWallet() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("connected to chain:" + parseInt(chainId));

      const goerliId = "0x5";
      if (chainId !== goerliId) {
        alert("not connected to goerli network");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("found accounts", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("error connecting to metamask");
    }
  };
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log(chainId);
    // console.log("Connected to chain:" + chainId);

    const rinkebyChainId = "0x5";

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  // useEffect(() => {
  //   connectWallet();
  //   checkCorrectNetwork();
  // }, []);

  return (
    <div>
      <div>
        {correctNetwork === "" ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Connected</p>
        )}
        <p>
          {correctNetwork}
          {currentAccount}
        </p>
      </div>
      <h1>Hello world</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}
