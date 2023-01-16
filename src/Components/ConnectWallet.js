/** @format */

import { ethers } from "ethers";
import { useState, useEffect } from "react";

// import { abi, nftABI, contractAddress, NFTcontractAddress } from "../constants";

export default function ConnectWallet() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [connected, setConnected] = useState(false);

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
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnected(true);

      console.log("found accounts", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("error connecting to metamask");
      setConnected(false);
      console.log(connected);
    }
  };

  // useEffect(() => {
  //   document.getElementById("connect").innerHTML = "connected";
  //   setConnected(true);
  // }, [connected]);

  return (
    <div>
      <div>
        {connected === false ? (
          <button id="connect" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <p>Connected</p>
        )}
      </div>
      {/* <h1>Hello world</h1>
      <button onClick={connectWallet}>Connect Wallet</button> */}
    </div>
  );
}
