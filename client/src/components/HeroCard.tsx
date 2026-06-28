import React, { useState } from 'react';
import { useSound } from '../context/SoundContext';
import styles from './HeroCard.module.css';

interface HeroCardProps {
    isGenerating: boolean;
    error: string | null;
    onSubmit: (decision: string, category: string) => Promise<void>;
}

const CATEGORIES = ['Career', 'Finance', 'Relationships', 'Health', 'Education', 'Lifestyle', 'Other'];

export default function HeroCard({ isGenerating, error, onSubmit }: HeroCardProps) {
    const [decision, setDecision] = useState('');
    const [category, setCategory] = useState('');
    const { playSound } = useSound();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!decision.trim() || isGenerating) return;
        await onSubmit(decision.trim(), category);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (decision.trim() && !isGenerating) {
                onSubmit(decision.trim(), category);
            }
        }
    };

    return (
        <section className={styles.heroCard} aria-label="Explore Future possibilities">
            {/* Centered Typography Hierarchy */}
            <div className={styles.welcome}>
                <h1 className={styles.title}>What future are we exploring?</h1>
                <p className={styles.subtitle}>Describe a decision and simulate multiple possible futures.</p>
            </div>

            {/* Modern Spacious Form Wrapper */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                    className={styles.textarea}
                    placeholder="Describe your decision... e.g., 'Should I quit my job to start a startup?' or 'Should I move to a new city for a relationship?'"
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isGenerating}
                    rows={4}
                />

                <div className={styles.footer}>
                    <select
                        className={styles.select}
                        value={category}
                        onChange={(e) => { playSound('click'); setCategory(e.target.value); }}
                        disabled={isGenerating}
                    >
                        <option value="">Set category (optional)</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            padding: '0.75rem 2.2rem',
                            fontSize: '0.9rem',
                            borderRadius: '999px',
                            minWidth: '180px',
                            fontWeight: '600',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        disabled={!decision.trim() || isGenerating}
                    >
                        {isGenerating ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                                Simulating...
                            </span>
                        ) : (
                            <>Simulate Futures ✨</>
                        )}
                    </button>
                </div>
            </form>

            {/* Subtext Prompt */}
            <div className={styles.tips}>
                <span>💡 Tip: Specify timelines and financial constraints for richer simulations.</span>
            </div>

            {error && <div className={styles.error}>⚠️ {error}</div>}
        </section>
    );
}
