import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecisionStore } from '../stores/decisionStore';
import { useSound } from '../context/SoundContext';
import HeroCard from '../components/HeroCard';
import EmptyState from '../components/EmptyState';
import AccuracyDashboard from '../components/timeline/AccuracyDashboard';
import styles from './DashboardPage.module.css';

const THINKING_MESSAGES = [
    '🔮 Analyzing your decision...',
    '🌐 Exploring possible futures...',
    '📊 Calculating probabilities...',
    '🎯 Mapping potential outcomes...',
    '✨ Generating timelines...',
    '🧠 Simulating life paths...',
    '⚡ Processing scenarios...',
];

function ThinkingIndicator() {
    const [elapsed, setElapsed] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsed(prev => prev + 1);
        }, 1000);

        const messageTimer = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % THINKING_MESSAGES.length);
        }, 2500);

        return () => {
            clearInterval(timer);
            clearInterval(messageTimer);
        };
    }, []);

    return (
        <div className={styles.thinkingIndicator} style={{ marginBottom: '2rem' }}>
            <div className={styles.thinkingHeader}>
                <div className={styles.thinkingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className={styles.thinkingTime}>Thinking for {elapsed}s</span>
            </div>
            <p className={styles.thinkingMessage}>{THINKING_MESSAGES[messageIndex]}</p>
        </div>
    );
}

export default function DashboardPage() {
    const { decisions, isGenerating, error, createDecision, fetchDecisions, setCurrentDecision } = useDecisionStore();
    const { playSound } = useSound();
    const navigate = useNavigate();
    const [startSampleTrigger, setStartSampleTrigger] = useState(false);

    // Fresh start: clear current selection on load and load decisions
    useEffect(() => {
        setCurrentDecision(null);
        fetchDecisions();
    }, [setCurrentDecision, fetchDecisions]);

    const handleHeroSubmit = async (decisionText: string, categoryText: string) => {
        playSound('send');
        try {
            const result = await createDecision(decisionText, categoryText || undefined);
            navigate(`/decision/${result.decision.id}`);
        } catch {
            // Handled by store
        }
    };

    return (
        <div className={styles.container}>
            {/* Contemplation Hero Header with Typing Simulation */}
            <HeroCard
                isGenerating={isGenerating}
                error={error}
                onSubmit={handleHeroSubmit}
                triggerSample={startSampleTrigger}
                onSampleTriggered={() => setStartSampleTrigger(false)}
            />

            {/* Thinking Indicator */}
            {isGenerating && <ThinkingIndicator />}

            {/* Accuracy Dashboard Widget */}
            <AccuracyDashboard />

            {/* Empty State Onboarding Screen */}
            {decisions.length === 0 && !isGenerating && (
                <EmptyState
                    onExploreSample={() => setStartSampleTrigger(true)}
                    isGenerating={isGenerating}
                />
            )}

            {/* Quick Tips List */}
            {decisions.length > 0 && !isGenerating && (
                <section className={styles.tipsSection}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                        💡 Tips for Better Results
                    </h2>
                    <div className={styles.tipsList}>
                        <div className={styles.tip}>
                            <span className={styles.tipIcon}>🎯</span>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>Be Specific</h4>
                                <p>Describe your choices in natural language, details matter.</p>
                            </div>
                        </div>
                        <div className={styles.tip}>
                            <span className={styles.tipIcon}>⏱️</span>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>Timeframes</h4>
                                <p>Mention specific timelines (e.g. next 6 months, 2 years).</p>
                            </div>
                        </div>
                        <div className={styles.tip}>
                            <span className={styles.tipIcon}>💰</span>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>Constraints</h4>
                                <p>Include financial, geographic, or emotional factors.</p>
                            </div>
                        </div>
                        <div className={styles.tip}>
                            <span className={styles.tipIcon}>❤️</span>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>Relationships</h4>
                                <p>Specify if it affects family, partners, or friendships.</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
