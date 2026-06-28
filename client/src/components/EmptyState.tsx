import { useSound } from '../context/SoundContext';

interface EmptyStateProps {
    onExploreSample: () => void;
    isGenerating: boolean;
}

export default function EmptyState({ onExploreSample, isGenerating }: EmptyStateProps) {
    const { playSound } = useSound();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'rgba(22, 32, 50, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                backdropFilter: 'blur(16px)',
                maxWidth: '650px',
                margin: '2rem auto',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
        >
            {/* Friendly SVG Illustration */}
            <svg
                width="200"
                height="160"
                viewBox="0 0 200 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: '1.5rem', animation: 'float 3s infinite ease-in-out' }}
            >
                <circle cx="100" cy="80" r="50" fill="url(#circleGradient)" opacity="0.15" />
                <path
                    d="M100 20C60 20 40 40 40 80C40 120 60 140 100 140C140 140 160 120 160 80C160 40 140 20 100 20Z"
                    stroke="url(#accentGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                />
                
                {/* Floating elements */}
                <circle cx="60" cy="50" r="6" fill="#FF7A59" opacity="0.8" />
                <circle cx="140" cy="110" r="8" fill="#FFB86B" opacity="0.8" />
                <path d="M135 45L145 55M145 45L135 55" stroke="#FFDCA8" strokeWidth="2" strokeLinecap="round" />
                
                {/* Telescope / Looking glass representation */}
                <rect x="75" y="70" width="50" height="20" rx="4" transform="rotate(-30 75 70)" fill="url(#accentGrad)" />
                <circle cx="118" cy="45" r="14" fill="#0f1724" stroke="#FFB86B" strokeWidth="3" />
                <circle cx="118" cy="45" r="8" fill="#FFDCA8" opacity="0.7" />

                <defs>
                    <linearGradient id="circleGradient" x1="50" y1="30" x2="150" y2="130" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF7A59" />
                        <stop offset="1" stopColor="#FFB86B" />
                    </linearGradient>
                    <linearGradient id="accentGrad" x1="40" y1="80" x2="160" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF7A59" />
                        <stop offset="1" stopColor="#FFB86B" />
                    </linearGradient>
                </defs>
            </svg>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem', color: '#fff' }}>
                Your future is a blank canvas 🔮
            </h3>
            
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.8rem', maxWidth: '450px' }}>
                No decisions recorded yet. Experience the power of timeline simulation by preloading a sample scenario, or type your own choice in the hero block above.
            </p>

            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    playSound('click');
                    onExploreSample();
                }}
                disabled={isGenerating}
                style={{
                    padding: '0.8rem 2.2rem',
                    fontSize: '1.05rem',
                    borderRadius: '999px',
                    boxShadow: '0 0 15px var(--color-accent-sunrise-glow)',
                    fontWeight: '700'
                }}
            >
                {isGenerating ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="spinner" style={{ width: '18px', height: '18px' }}></span>
                        Preloading sample timeline...
                    </span>
                ) : (
                    '✨ Explore a sample future'
                )}
            </button>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
}
