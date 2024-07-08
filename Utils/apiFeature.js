import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  GPT_MEMEBRSHIP_ADDRESS,
  GPT_MEMEBRSHIP_ABI,
} from "../Context/constants";

// CHECK WALLET CONNECTION
export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

// CONNECT WALLET
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

// FETCH WALLET
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    GPT_MEMEBRSHIP_ADDRESS,
    GPT_MEMEBRSHIP_ABI,
    signerOrProvider
  );

// CONNECTING WITH CONTRACT
export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
