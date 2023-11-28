"use strict";

(() => {
  let userAddress = null;
  let connect = document.querySelector("#wallet-connect");

  connectWallet();

  connect.addEventListener("click", async () => {
    connectWallet();
  });

  async function connectWallet() {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((data) => {
        userAddress = data[0];
        let walletString =
          userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
        connect.innerHTML = walletString;
        return userAddress;
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect a wallet.");
        } else {
          console.error(err);
        }
      });
  }
})();
