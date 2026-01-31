document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // 1. Navigate to dashboard.html on init button click
    // =========================
    const initBtn = document.querySelector('.btn-init');
    if (initBtn) {
        initBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

    // =========================
    // 2. Material Design Ripple Effect for all buttons
    // =========================
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let d = Math.max(this.clientWidth, this.clientHeight);
            ripple.style.width = ripple.style.height = d + 'px';
            ripple.style.left = e.offsetX - d/2 + 'px';
            ripple.style.top = e.offsetY - d/2 + 'px';
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // =========================
    // 3. Connect Wallet Functionality
    // =========================
const connectBtn = document.getElementById('connectBtn');

async function connectWallet() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 1. Initialize Ethers Provider
            const provider = new ethers.BrowserProvider(window.ethereum);
            
            // 2. Request account access
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // 3. Update UI
            console.log('Connected account:', address);
            // Show a shortened version of the address (e.g., 0x123...abcd)
            connectBtn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
            connectBtn.style.backgroundColor = '#4caf50'; // Turn green on success
            
            // Optional: Store in localStorage to keep user logged in across pages
            localStorage.setItem('userConnected', 'true');

        } catch (err) {
            console.error('User rejected connection:', err);
            alert('Connection rejected! Please approve the request in MetaMask.');
        }
    } else {
        // Handle missing wallet
        alert('MetaMask not found. Please install a crypto wallet extension!');
        window.open('https://metamask.io/download/', '_blank');
    }
}

if (connectBtn) {
    connectBtn.addEventListener('click', connectWallet);
}

// Auto-check connection on page load
window.addEventListener('load', async () => {
    if (localStorage.getItem('userConnected') === 'true' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
            const address = accounts[0].address;
            connectBtn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
            connectBtn.style.backgroundColor = '#4caf50';
        }
    }
});