import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
// Import your TipJar ABI (the individual contract, not the factory)
import { bottleABI } from "./abi/BottleABI.js"; 

const sendBtn = document.getElementById('sendBtn');
const recipientInput = document.getElementById('recipientAddress');

// 1. Get Address from URL (e.g., widget.html?address=0x123...)
const urlParams = new URLSearchParams(window.location.search);
const jarAddress = urlParams.get('address');

// Auto-fill the address field
if (jarAddress) {
    recipientInput.value = jarAddress;
}

async function sendTip() {
    if (!window.ethereum) return alert("Install MetaMask!");

    try {
        sendBtn.disabled = true;
        sendBtn.innerText = "Sending...";

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // 2. Setup the specific TipJar contract
        const tipJarContract = new ethers.Contract(jarAddress, bottleABI, signer);

        const name = document.getElementById('senderName').value;
        const message = document.getElementById('senderMessage').value;
        const amount = document.getElementById('ethAmount').value;

        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        // 3. Call the tip function (assuming your Solidity function is named 'buyCoffee' or similar)
        // We pass the name and message, and include the ETH in the 'value' field
        const tx = await tipJarContract.buyCoffee(
            name || "Anonymous", 
            message || "Enjoy!", 
            { value: ethers.parseEther(amount) }
        );

        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();

        alert("Coffee bought! Thank you for supporting.");
        window.location.href = 'creatosjournal.html';

    } catch (error) {
        console.error(error);
        alert("Transaction failed: " + (error.reason || error.message));
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerText = "Send ETH";
    }
}

sendBtn.addEventListener('click', sendTip);
