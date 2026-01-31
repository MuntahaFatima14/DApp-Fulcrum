import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { factoryABI } from "./abi/FactoryABI.js";
import { CONTRACT_CONFIG } from "./config.js";

export async function connectFactory() {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_CONFIG.factoryAddress, factoryABI, signer);
}

// Function to get the list of all created jars from the factory
export async function getAllJars() {
    const factory = await connectFactory();
    // In your Solidity: address[] public allJars; 
    // Ethers allows calling public arrays like functions or via a getter
    const count = await factory.getTotalJars();
    const jars = [];
    for(let i = 0; i < count; i++) {
        jars.push(await factory.allJars(i));
    }
    return jars;
}