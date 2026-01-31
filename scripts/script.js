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
    // 2. Material Design Ripple Effect
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
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                console.log('Connected account:', address);
                connectBtn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
                connectBtn.style.backgroundColor = '#4caf50'; 
                
                localStorage.setItem('userConnected', 'true');
            } catch (err) {
                console.error('User rejected connection:', err);
                alert('Connection rejected! Please approve the request in MetaMask.');
            }
        } else {
            alert('MetaMask not found. Please install a crypto wallet extension!');
            window.open('https://metamask.io/download/', '_blank');
        }
    }

    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }

    // Auto-check connection on page load
    const checkConnection = async () => {
        if (localStorage.getItem('userConnected') === 'true' && window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                const address = accounts[0].address;
                connectBtn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
                connectBtn.style.backgroundColor = '#4caf50';
            }
        }
    };
    checkConnection();

}); // THIS IS THE CRITICAL LINE THAT WAS MISSING