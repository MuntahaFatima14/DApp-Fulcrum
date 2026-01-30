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
    const connectBtn = document.querySelector('.connect-btn');

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request wallet connection
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];

                // Display connected account in the button
                connectBtn.textContent = account.slice(0, 6) + '...' + account.slice(-4);
                connectBtn.style.backgroundColor = '#4caf50'; // Optional: change color after connect
                console.log('Connected account:', account);

                // Optional: redirect to dashboard after connect
                // window.location.href = 'dashboard.html';

            } catch (err) {
                console.error('User rejected connection:', err);
                alert('Connection rejected!');
            }
        } else {
            alert('MetaMask not found. Please install a crypto wallet!');
        }
    }

    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }
});
