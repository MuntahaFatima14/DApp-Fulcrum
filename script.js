document.addEventListener('DOMContentLoaded', () => {
    // Navigate to dashboard.html on initialize button click
    const initBtn = document.querySelector('.btn-init');
    if (initBtn) {
        initBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

    // Material Design Ripple Effect for all buttons
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
});