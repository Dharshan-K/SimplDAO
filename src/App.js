/** @format */

import logo from "./logo.svg";
import "./App.css";
import ConnectWallet from "./Components/ConnectWallet";
import ProposalList from "./Components/proposalList";

function App() {
  return (
    <div>
      <ConnectWallet />
      <ProposalList />
    </div>
  );
}

export default App;
