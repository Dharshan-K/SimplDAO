/** @format */

import "../assets/main.css";
import ConnectWallet from "./ConnectWallet";
import ProposalList from "./proposalList";
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
