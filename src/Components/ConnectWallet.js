/** @format */

import { useState } from "react";

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
      console.log(correctNetwork, currentAccount);

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

  return (
    <div>
      <div className="bg-white-400 text-black border border-green-400 hover:text-white hover:bg-green-400 mt-5 mb-5 ml-5 w-24 px-2 py-1 rounded">
        {connected === false ? (
          <button id="connect" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <p>Connected</p>
        )}
      </div>
    </div>
  );
}
