import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { factoryABI } from "./abi/FactoryABI.js";

const factoryAddress = "0x08669bb2714a578Af29c93C4569Ed25De014456F"; // From your deployment screenshot

export async function connectContract() {
    const provider = new ethers.BrowserProvider(window.ethereum); // Connects to MetaMask
    const signer = await provider.getSigner();
    return new ethers.Contract(factoryAddress, factoryABI, signer);
}