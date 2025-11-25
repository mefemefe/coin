const coin = document.getElementById('coin');
const container = document.getElementById('coin-container');
let currentRotation = 0;
let isFlipping = false;

container.addEventListener('click', () => {
    if (isFlipping) return; // Prevent double clicks
    isFlipping = true;

    // 1. Decide Outcome (0 = Heads, 1 = Tails)
    const outcome = Math.random() < 0.5 ? 0 : 1;
    
    // 2. Calculate spins
    // We want at least 5 full spins (1800 degrees)
    // Plus the outcome (0 or 180)
    const spins = 5 + Math.floor(Math.random() * 5); // 5 to 10 spins
    const degrees = (spins * 360) + (outcome * 180);
    
    // 3. Apply rotation
    // We add to currentRotation so it doesn't snap back to 0
    currentRotation += degrees;
    
    // Adjust logic: if we are currently on tails (180 mod 360),
    // and want to land on heads, we need to ensure the math lines up.
    // Actually, simplify: 
    // Just set transform. The CSS transition handles the animation.
    
    coin.style.transform = `rotateY(${currentRotation}deg)`;

    // 4. Haptic Feedback (Vibrate phone when coin hits)
    setTimeout(() => {
        isFlipping = false;
        if (navigator.vibrate) navigator.vibrate(50); // Bzzzt
    }, 3000); // Matches CSS transition time (3s)
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}