/** @format */

import "../assets/main.css";
import ConnectWallet from "./ConnectWallet";
import ProposalList from "./proposalList";
import { Link } from "react-router-dom";
import VoteProposal from "./voteProposal";

function App() {
  return (
    <div>
      <ConnectWallet />
      <div className="">
        <ProposalList />
      </div>
      <VoteProposal />
    </div>
  );
}

export default App;
