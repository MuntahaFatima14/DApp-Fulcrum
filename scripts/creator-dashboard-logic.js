import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { getAllJars } from "./blockchain-interaction.js";
import { bottleABI } from "./abi/BottleABI.js";

const balanceEl = document.getElementById('contractBalance');
const iframeEl = document.getElementById('iframeCode');
const withdrawBtn = document.getElementById('withdrawBtn');

let userJarAddress = null;

async function initDashboard() {
    try {
        if (!window.ethereum) return alert("Please install MetaMask");
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        // 1. Find the jar belonging to the user
        const jars = await getAllJars();
        
        for (const addr of jars) {
            const jarContract = new ethers.Contract(addr, bottleABI, provider);
            const journalist = await jarContract.journalist(); // Match your Solidity variable

            if (journalist.toLowerCase() === userAddress.toLowerCase()) {
                userJarAddress = addr;
                break;
            }
        }

        if (!userJarAddress) {
            balanceEl.innerText = "No Jar Found";
            iframeEl.innerText = "Please deploy a jar first!";
            withdrawBtn.disabled = true;
            return;
        }

        // 2. Fetch Balance and Data
        const balanceWei = await provider.getBalance(userJarAddress);
        balanceEl.innerText = `${ethers.formatEther(balanceWei)} ETH`;

        // 3. Generate iFrame Code (Using your current local/live URL)
        const widgetUrl = `${window.location.origin}/widget.html?address=${userJarAddress}`;
        iframeEl.innerText = `<iframe src="${widgetUrl}" width="350px" height="500px" style="border:none;"></iframe>`;

    } catch (error) {
        console.error("Dashboard Error:", error);
    }
}

async function handleWithdraw() {
    if (!userJarAddress) return;

    try {
        withdrawBtn.innerText = "Withdrawing...";
        withdrawBtn.disabled = true;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const jarContract = new ethers.Contract(userJarAddress, bottleABI, signer);

        // Calling: function withdraw() external nonReentrant
        const tx = await jarContract.withdraw();
        alert("Withdrawal initiated! Waiting for block...");
        
        await tx.wait();
        alert("Funds successfully transferred to your wallet!");
        initDashboard(); // Refresh balance

    } catch (error) {
        console.error(error);
        alert("Withdrawal failed: " + (error.reason || "Transaction rejected"));
    } finally {
        withdrawBtn.innerText = "Withdraw Funds";
        withdrawBtn.disabled = false;
    }
}

withdrawBtn.addEventListener('click', handleWithdraw);
initDashboard();