// Pure Web Audio API Sound Synthesizer (0 external assets, 0ms lag)

let audioCtx = null;
let soundEnabled = false;

// Try restoring sound preference from localStorage
try {
    const saved = localStorage.getItem('lm_sound_enabled');
    if (saved === 'true') {
        soundEnabled = true;
    }
} catch {
    // ignore
}

function getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

export function isSoundEnabled() {
    return soundEnabled;
}

export function toggleSound() {
    soundEnabled = !soundEnabled;
    try {
        localStorage.setItem('lm_sound_enabled', String(soundEnabled));
    } catch {
        // ignore
    }
    if (soundEnabled) {
        playSound('success');
    }
    return soundEnabled;
}

export function playSound(type = 'click') {
    if (!soundEnabled) return;

    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        switch (type) {
            case 'click':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.045);
                osc.start(now);
                osc.stop(now + 0.045);
                break;

            case 'hover':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(450, now);
                gain.gain.setValueAtTime(0.006, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.025);
                osc.start(now);
                osc.stop(now + 0.025);
                break;

            case 'success':
                // Two pleasant rising tones
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                gain.gain.setValueAtTime(0.025, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
                break;

            case 'open':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.09);
                osc.start(now);
                osc.stop(now + 0.09);
                break;

            case 'close':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(640, now);
                osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);
                gain.gain.setValueAtTime(0.018, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
                break;

            case 'terminal':
                osc.type = 'square';
                osc.frequency.setValueAtTime(800, now);
                gain.gain.setValueAtTime(0.012, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.start(now);
                osc.stop(now + 0.02);
                break;

            default:
                break;
        }
    } catch {
        // audio context errors silently ignored
    }
}
