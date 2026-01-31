import { connectContract } from "./blockchain-interaction.js";

const container = document.getElementById('creatorsContainer');

async function loadCreators() {
    try {
        const factory = await connectContract();
        
        // Replace 'getAllTipJars' with the actual function name in your Solidity
        // that returns an array of addresses or structs.
        const jars = await factory.getAllTipJars(); 

        if (jars.length === 0) {
            container.innerHTML = "<p>No creators found yet. Be the first!</p>";
            return;
        }

        container.innerHTML = ""; // Clear the loading message

        jars.forEach((jarAddress, index) => {
            // We create a card for each jar found
            const card = document.createElement('section');
            card.style = "background-color:var(--card-bg); border-radius:20px; padding:35px 40px; display:flex; flex-direction:column; gap:15px;";
            
            // Note: If your contract returns a struct with a name, use that here.
            // For now, we use a placeholder or the index.
            card.innerHTML = `
                <h3 style="font-size:1.3rem; font-weight:800; color:black;">Creator #${index + 1}</h3>
                <p style="font-size:0.65rem; font-weight:800;">Jar: ${jarAddress}</p>
                <button onclick="window.location.href='widget.html?address=${jarAddress}'" 
                        style="background-color:var(--btn-bg); color:#fff; border:none; border-radius:12px; padding:16px; font-size:0.75rem; font-weight:800; cursor:pointer;">
                    Buy a Coffee
                </button>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading creators:", error);
        container.innerHTML = "<p>Failed to load creators. Make sure your wallet is connected.</p>";
    }
}

// Initialize on load
loadCreators();