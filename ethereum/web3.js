import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running.
  //web3 = new Web3(window.web3.currentProvider);
  const f = async () => {
    await window.window.ethereum.enable();
  };
  f();
  web3 = new Web3(window.window.ethereum);
} else {
  // we are on the server or user is not running metamask
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

  web3 = new Web3(provider);
}

export default web3;
