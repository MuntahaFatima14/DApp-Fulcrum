import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { bottleABI } from "./abi/BottleABI.js";

async function sendTip() {
    const jarAddress = new URLSearchParams(window.location.search).get('address');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const jarContract = new ethers.Contract(jarAddress, bottleABI, signer);

    const name = document.getElementById('senderName').value;
    const message = document.getElementById('senderMessage').value;
    const ethAmount = document.getElementById('ethAmount').value;

    try {
        // Calling: function buyCoffee(string calldata _name, string calldata _message) external payable
        const tx = await jarContract.buyCoffee(name, message, {
            value: ethers.parseEther(ethAmount)
        });
        
        await tx.wait();
        alert("Tip sent!");
    } catch (error) {
        console.error(error);
    }
}