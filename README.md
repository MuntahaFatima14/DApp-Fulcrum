# DApp-Fulcrum
 
# Crypto-Caffeine ☕️
A decentralized protocol for micro-donations. This platform allows independent creators to deploy their own immutable "Tip Jar" on the blockchain using EIP-1167 Minimal Proxies.

## 🚀 Getting Started

### Prerequisites
* **Python 3.x** (for the local development server)
* **MetaMask Browser Extension**
* **A Local Blockchain** (like Ganache) or a Testnet (like Sepolia)

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/your-username/crypto-caffeine.git](https://github.com/your-username/crypto-caffeine.git)
   cd crypto-caffeine
Configure your Contract Address: Open config.js and update the factoryAddress with your deployed CaffeineFactory address.

Start the local server:

Bash
python -m http.server 8000
Access the DApp: Open your browser and navigate to http://localhost:8000.

🛠 Project Architecture
This project uses a Factory-Clone pattern to save gas during deployment:

CaffeineFactory: Deploys a minimal proxy (clone) for every new creator.

CryptoCaffeineBottle: The logic contract that handles tipping, storing memos, and withdrawals.

Folder Structure
/abi: Contains FactoryABI.js and BottleABI.js.

blockchain-interaction.js: Shared ethers.js initialization logic.

config.js: Centralized configuration for contract addresses.

index.html: Home page and wallet connection.

creator.html: The portal to deploy a new Tip Jar.

creatosjournal.html: Directory of all active creators.

widget.html: The individual tipping interface.

dashboard.html: Private management portal for creators to withdraw funds.

⚠️ Troubleshooting
ERR_ADDRESS_INVALID: This occurs if you try to visit http://[::]:8000. Always use http://localhost:8000 or http://127.0.0.1:8000.

MetaMask Not Found: Ensure you are running through the Python server. MetaMask will not inject into files opened via the file:// protocol.

Module Errors: Ensure your script tags include type="module" in the HTML files.

📄 License
© 2026 Crypto-Caffeine. Created as a final year Computer Science project.