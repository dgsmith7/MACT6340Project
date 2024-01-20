import { ethers } from "./ethers-5.2.esm.js";
import { contractABI } from "./contractABI.js";
import "./ejs.js";

("use strict");

export let provider = null;
export let signer = null;
export let userAddress = null;
export let contractList = document
  .querySelector("#contracts")
  .innerHTML.split(",");
export let mintList = document.querySelector("#mints").innerHTML.split(",");
export let projectList = JSON.parse(
  document.querySelector("#projects").innerHTML
);
export let isConnected = false;

let connect = document.querySelector("#wallet-connect");
await connectWallet();
document.querySelector("#mints").innerHTML = mintList;
connect.addEventListener("click", async () => {
  connectWallet();
});
if (isConnected) {
  await updateMints();
}

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      connect.innerHTML = "Connected";
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const accounts = await ethereum.request({ method: "eth_accounts" });
      userAddress = "" + accounts[0];
      console.log("userAddress: ", userAddress);
      let walletString =
        userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
      connect.innerHTML = walletString;
      console.log("provider: ", provider);
      console.log("wallet: ", userAddress);
      console.log("signer: ", signer);
      isConnected = true;
    } catch (error) {
      connect.innerHTML = "Check Metamask";
      isConnected = false;
    }
  } else {
    connect.innerHTML = "Please connect MetaMask";
    isConnected = false;
  }
}

export async function updateMints() {
  let newList = [];
  for (let i = 0; i < contractList.length; i++) {
    let contractAddress = contractList[i];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    contract.connect(signer);
    let num = await contract.totalSupply();
    newList.push(num.toString());
  }
  mintList = [...newList];
}
