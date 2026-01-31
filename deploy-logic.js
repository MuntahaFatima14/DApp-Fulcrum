import { connectFactory } from "./blockchain-interaction.js";

async function handleDeployment() {
    const pubNameInput = document.getElementById('pubName');
    const deployBtn = document.getElementById('deployBtn');

    try {
        const factory = await connectFactory();
        const link = pubNameInput.value; // This maps to _iframeLink in your contract

        const tx = await factory.createJar(link);
        console.log("Transaction Hash:", tx.hash);
        
        await tx.wait();
        alert("Jar Created Successfully!");
        window.location.href = 'creatosjournal.html';
    } catch (error) {
        console.error(error);
        alert("Deployment failed.");
    }
}