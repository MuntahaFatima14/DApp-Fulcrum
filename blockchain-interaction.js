// Import the library, the ABI, and now your new config
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { factoryABI } from "./abi/FactoryABI.js";
import { CONTRACT_CONFIG } from "./config.js";

export async function connectContract() {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Uses the address from config.js
    return new ethers.Contract(CONTRACT_CONFIG.factoryAddress, factoryABI, signer);
}