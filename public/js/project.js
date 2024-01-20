import { ethers } from "../js/ethers-5.2.esm.js";
import { contractABI } from "../js/contractABI.js";
import {
  signer,
  contractList,
  mintList,
  projectList,
  updateMints,
  isConnected,
} from "../js/index.js";
import { tokenCard } from "../js/tokenCard.js";

("use strict");

let id = parseInt(document.querySelector("#project-id").innerHTML) - 1;
let mintMessage = "";
if (isConnected) {
  await updateMints();
  document.querySelector("#mint-quant").innerHTML = mintList[id];
  showMints();
  updateMintMessage();
  document.querySelector("#mint-button").addEventListener("click", () => {
    doMintBehaviors();
  });
} else {
  mintMessage = "Please connect your wallet, then refresh";
  document.querySelector("#mint-message").innerHTML = mintMessage;
}

async function doMintBehaviors() {
  document.querySelector("#mint-button").classList.add("disabled");
  document.querySelector("#mint-button").innerHTML = "Briefly Transacting...";
  let contractAddress = contractList[id];
  console.log("Contract: ", contractAddress);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  contract.connect(signer);
  let supply = await contract.totalSupply();
  supply = supply.toString();
  let tokenNum = parseInt(supply) + 1;
  console.log("Token number: ", tokenNum);
  let summary = JSON.parse(projectList[id].summaryData);
  console.log(summary);
  let base_uri = summary.elements[2].metas[supply].ipfs;
  console.log("BaseURI: ", base_uri);
  let mintPrice = await contract.getMintPrice();
  mintPrice = mintPrice.toString();
  mintPrice = parseFloat(mintPrice);
  console.log("Mint price: ", mintPrice);
  let value = mintPrice.toString();
  console.log("Value: " + value + " GWEI.");
  let token = await contract.mintTo(base_uri, { value: value });
  document.querySelector("#mint-button").innerHTML = "Confirming...";
  await token.wait(1);
  document.querySelector("#mint-button").innerHTML = "Almost done...";
  await token.wait(2);
  updateMintMessage();
  window.location.reload();
}

async function updateMintMessage() {
  if (isConnected == false) {
    mintMessage = "Please connect your wallet, then refresh";
  } else {
    let contractAddress =
      contractList[
        parseInt(document.querySelector("#project-id").innerHTML) - 1
      ];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    contract.connect(signer);
    let supply = await contract.totalSupply();
    supply = supply.toString();
    let max = await contract.getMaxSupply();
    max = max.toString();
    console.log("Total supply is: ", supply);
    console.log("Max supply is: ", max);
    mintMessage = "Tokens are available. Mint yours now.";
    let mintButton = document.querySelector("#mint-button");
    if (projectList[id].active == 0) {
      document.querySelector("#status").innerHTML = "Inactive - ";
      document.querySelector("#mint-button").classList.add("disabled");
    } else {
      document.querySelector("#status").innerHTML = "Active - ";
      document.querySelector("#mint-button").classList.remove("disabled");
    }
    if (supply == max) {
      mintMessage =
        "This project is minted out. Please check secondary sales marketplaces and cosider using one that supports artist royalties.";
      mintButton.classList.add("disabled");
      document.querySelector("#status").innerHTML = "Inactive - ";
    }
    if (supply == 0) {
      mintMessage = "Be the first collector to mint from this project.";
    }
  }
  document.querySelector("#mint-message").innerHTML = mintMessage;
}

async function showMints() {
  let str = "";
  await updateMints();
  for (let i = 0; i < mintList[id]; i++) {
    let summary = JSON.parse(projectList[id].summaryData);
    let image = summary.elements[0].images[i].ipfs;
    let anim = summary.elements[1].anims[i].ipfs;
    let meta = summary.elements[2].metas[i].ipfs;
    let data = {
      image: image,
      anim: anim,
      name: projectList[id].project_name,
      edition: i + 1,
      number: projectList[id].quantity,
      price: projectList[id].price_eth,
      metadata: meta,
    };
    str += "<div class='col-10'>" + ejs.render(tokenCard, data) + "</div>";
  }
  document.querySelector("#token-views").innerHTML = str;
}
