/** @format */

import "../assets/main.css";
import ConnectWallet from "./ConnectWallet";
import ProposalList from "./proposalList";
import { Link } from "react-router-dom";
import VoteProposal from "./voteProposal";
import MintNFT from "./mintNFT";

function App() {
  return (
    <div>
      <ConnectWallet />
      <div className="">
        <ProposalList />
      </div>
      <MintNFT />
    </div>
  );
}

export default App;
