let isBreathing = false;
let breathingInterval;
let timeInterval;
let startTime;
let currentPhase = 'inhale';
let activeSound = null;
let audioContext;
let currentAudioSource;


function createParticles(){
    const container = document.querySelector('.bg-particles');
    for(let i = 0; i < 20; i++){
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}


function initAudio() {
    if(!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function createSound(type){
    if(!audioContext) return null;

    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    switch(type) {
        case 'rain':
            for(let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.3;
            }
            break;

        case 'ocean':
            for(let i = 0; i < bufferSize; i++) {
                const wave1 = Math.sin(2 * Math.PI * 0.1 * i / audioContext.sampleRate);
                const wave2 = Math.sin(2 * Math.PI * 0.05 * i / audioContext.sampleRate);
                const noise = (Math.random() * 2 - 1) * 0.1;
                data[i] = (wave1 + wave2) * 0.3 + noise;
            }
            break;

        case 'forest':
            for(let i = 0; i < bufferSize; i++) {
                const sample = (Math.random() * 2 - 1) * 0.2;
                if (Math.random() < 0.01) {
                    sample += Math.sin(2* Math.PI * (800 + Math.random() * 40) * i / audioContext.sampleRate) * 0.1;
                }
                data[i] = sample;
            }
            break;
    }
    return buffer;
}

function toggleSound(soundType){
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));

    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}





