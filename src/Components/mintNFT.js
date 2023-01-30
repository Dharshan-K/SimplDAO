/** @format */

import { NFTcontractAddress, NFT_ABI } from "../constants/index";
import { Contract, ethers } from "ethers";

export default function MintNFT() {
  const minting = async (event) => {
    try {
      event.preventDefault();
      const { ethereum } = window;
      const mintCount = parseInt(event.target.number.value);
      console.log("reading ethereum details......");
      console.log(mintCount, typeof mintCount);
      let chainID = await ethereum.request({ method: "eth_chainId" });
      chainID = parseInt(chainID);

      const daoContractAddress =
        chainID in NFTcontractAddress ? NFTcontractAddress[chainID][0] : null;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const daoContract = new Contract(daoContractAddress, NFT_ABI, signer);
      console.log("minting tokens ..........");
      await daoContract.mint(mintCount);
      console.log("tokens minted successfully..........");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form method="post" onSubmit={minting}>
        <label>Enter the No. of NFTs to be Minted: </label>
        <input
          className="border border-black mr-5"
          type="text"
          id="number"
        ></input>
        <input
          className="bg-white-400 text-black border border-green-400 hover:text-white hover:bg-green-400 px-3 py-1 rounded"
          type="submit"
          value="Mint"
        ></input>
      </form>
    </div>
  );
}
