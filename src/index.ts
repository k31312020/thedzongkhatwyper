import GameLoop from './game-loop';

import './styles.css';

// Entry point for the game

// Check device

const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(isPhone){
    const overlay = document.createElement('div');
    const overlayText = document.createElement('div');
    overlay.classList.add('overlay');
    overlayText.innerText = 'Device is not supported! Please try on your PC';
    overlayText.classList.add('overlay-text');
    overlay.appendChild(overlayText);
    document.body.appendChild(overlay);
}

window.onload = () => {
    if (isPhone) return;
    (document.querySelector('.game-content') as HTMLElement).style.display = 'block';
}

new GameLoop().gameLoop();

// message for devs
console.log('Hey you found the console! Contribute to this project https://github.com/k31312020/thedzongkhatwyper');