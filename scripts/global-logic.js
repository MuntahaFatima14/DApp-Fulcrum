import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.11.1/ethers.umd.min.js";
import { getAllJars } from "./blockchain-interaction.js";
import { bottleABI } from "./abi/BottleABI.js";

async function loadDashboard() {
    const jars = await getAllJars();
    const provider = new ethers.BrowserProvider(window.ethereum);
    let globalTotal = 0n;

    for (const addr of jars) {
        // 1. Get Balance for Total Tips (ETH)
        const balance = await provider.getBalance(addr);
        globalTotal += balance;

        // 2. Get Memos for the Table
        const jarContract = new ethers.Contract(addr, bottleABI, provider);
        const memos = await jarContract.getMemos();
        
        memos.forEach(memo => {
            // memo[0] is from, memo[2] is amount, memo[3] is name, memo[4] is message
            updateTable(memo, addr);
        });
    }
    document.getElementById('totalEth').innerText = `${ethers.formatEther(globalTotal)} ETH`;
}

function updateTable(memo, jarAddr) {
    const table = document.getElementById('memosTable');
    const row = table.insertRow();
    row.innerHTML = `
        <td>${memo.name} (${memo.from.slice(0,6)})</td>
        <td>${memo.message}</td>
        <td>${ethers.formatEther(memo.amount)} ETH</td>
    `;
}