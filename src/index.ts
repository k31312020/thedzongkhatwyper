import GameLoop from './game-loop';

import './styles.css';

// Entry point for the game

// Check device
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    const overlay = document.createElement('div');
    const overlayText = document.createElement('div');
    overlay.classList.add('overlay');
    overlayText.innerText = 'Device is not supported!';
    overlayText.classList.add('overlay-text');
    overlay.appendChild(overlayText);
    document.body.appendChild(overlay);
}

new GameLoop().gameLoop();
