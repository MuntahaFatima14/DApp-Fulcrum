import { connectContract } from "./blockchain-interaction.js";

const deployBtn = document.getElementById('deployBtn');
const pubNameInput = document.getElementById('pubName');

async function handleDeployment() {
    try {
        deployBtn.innerText = "Connecting...";
        deployBtn.disabled = true;

        // 1. Get the contract instance
        const factory = await connectContract();
        
        // 2. Get input
        const name = pubNameInput.value;
        if (!name) {
            alert("Please enter a name!");
            return;
        }

        // 3. Call the smart contract function
        console.log("Initiating transaction...");
        const tx = await factory.createTipJar(name);
        
        alert("Transaction sent! Please wait for confirmation.");
        await tx.wait(); // Wait for the block to be mined

        alert("Successfully deployed!");
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error("Deployment failed:", error);
        alert("Error: " + (error.reason || error.message));
    } finally {
        deployBtn.innerText = "Initialize Instance";
        deployBtn.disabled = false;
    }
}

if (deployBtn) {
    deployBtn.addEventListener('click', handleDeployment);
}