import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSound: (type: SoundKind) => void;
}

type SoundKind = 'send' | 'received' | 'click';

const SOUND_CONFIG: Record<SoundKind, { src: string; volume: number }> = {
    send:     { src: '/sounds/send.wav',     volume: 0.5 },
    received: { src: '/sounds/received.wav', volume: 0.6 },
    click:    { src: '/sounds/click.wav',    volume: 0.3 },
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('soundMuted');
        return saved === 'true';
    });

    // Audio objects are constructed lazily on the first `playSound(kind)` call.
    // Browsers reject autoplay until the user has interacted with the page —
    // building Audio at module load would either get blocked or trigger
    // console warnings on first navigation. Constructing inside an event
    // handler (which `playSound` is always called from) satisfies the
    // user-gesture requirement.
    const cache = useRef<Partial<Record<SoundKind, HTMLAudioElement>>>({});

    useEffect(() => {
        localStorage.setItem('soundMuted', String(isMuted));
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const playSound = useCallback((type: SoundKind) => {
        if (isMuted) return;
        if (typeof Audio === 'undefined') return;

        let sound = cache.current[type];
        if (!sound) {
            const config = SOUND_CONFIG[type];
            sound = new Audio(config.src);
            sound.volume = config.volume;
            cache.current[type] = sound;
        }

        sound.currentTime = 0;
        sound.play().catch(() => {
            // Still possible on some platforms (e.g. iOS strict autoplay);
            // swallow silently — UX shouldn't break if sound fails.
        });
    }, [isMuted]);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
