import { useEffect, useState } from 'react';
import { useRealityStore } from '../../stores/realityStore';
import styles from './AccuracyDashboard.module.css';

export default function AccuracyDashboard() {
    const { dashboardData, isLoading, error, fetchDashboardData } = useRealityStore();
    const total = dashboardData?.totalEventsLogged ?? 0;
    const targetAccuracy = dashboardData?.accuracyRate ?? 0;
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    useEffect(() => {
        if (total > 0) {
            setAccuracy(0);
            const duration = 1000; // 1s animation
            const startTime = performance.now();

            const animate = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Cubic ease-out
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                setAccuracy(Math.round(easeOutCubic * targetAccuracy));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            // Respect reduced motion settings
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mediaQuery.matches) {
                setAccuracy(targetAccuracy);
            } else {
                requestAnimationFrame(animate);
            }
        } else {
            setAccuracy(0);
        }
    }, [targetAccuracy, total]);

    if (isLoading && !dashboardData) {
        return (
            <div className={styles.dashboard}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <p style={{ color: '#ef4444', textAlign: 'center', margin: 0 }}>
                    ⚠️ {error}
                </p>
            </div>
        );
    }

    const confidence = dashboardData?.confidence ?? 0;
    const breakdown = dashboardData?.breakdown ?? {
        Financial: 0,
        Career: 0,
        Emotional: 0,
        Relationship: 0,
    };

    const categoryColors: Record<string, string> = {
        Financial: 'linear-gradient(90deg, #FF7A59, #FFB86B)',
        Career: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
        Emotional: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
        Relationship: 'linear-gradient(90deg, #ec4899, #f472b6)',
    };

    // SVG parameters
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (accuracy / 100) * circumference;

    return (
        <section className={styles.dashboard} aria-label="Accuracy Dashboard">
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.titleIcon}>🔄</span> Reality Feedback Loop
                </h2>
                <div className={styles.statLabel}>Prediction Validation</div>
            </div>

            {total === 0 ? (
                <div className={styles.emptyState}>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>No timeline events verified yet.</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.4rem' }}>
                        Go to your generated timelines and click <strong>Log Reality</strong> on Year 1-5 events to start measuring prediction accuracy.
                    </p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {/* Radial Meter Panel */}
                    <div className={styles.card} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem', justifyContent: 'center' }}>
                        <div className={styles.radialWrapper}>
                            <svg width="110" height="110" viewBox="0 0 110 110">
                                <defs>
                                    <linearGradient id="radialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FF7A59" />
                                        <stop offset="100%" stopColor="#FFB86B" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="55"
                                    cy="55"
                                    r={radius}
                                    className={styles.radialBg}
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="55"
                                    cy="55"
                                    r={radius}
                                    className={styles.radialFill}
                                    strokeWidth="8"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    stroke="url(#radialGrad)"
                                    strokeLinecap="round"
                                    transform="rotate(-90 55 55)"
                                />
                            </svg>
                            <div className={styles.radialLabel}>
                                <span className={styles.radialNumber}>{accuracy}%</span>
                                <span className={styles.radialText}>Accuracy</span>
                            </div>
                            
                            {/* Soft spark effect on completion */}
                            {accuracy === targetAccuracy && targetAccuracy > 0 && (
                                <div className={styles.sparkle} />
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <div className={styles.statLabel}>Validated Events</div>
                            <div className={styles.statVal} style={{ fontSize: '1.8rem', margin: 0 }}>{total}</div>
                            <div className={styles.statLabel} style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                                AI Confidence: <span style={{ color: '#FFB86B', fontWeight: 700 }}>{confidence}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Breakdown Panel */}
                    <div className={styles.card}>
                        <h3 className={styles.breakdownTitle}>Accuracy by Life Dimension</h3>
                        <div className={styles.breakdownGrid}>
                            {(Object.keys(breakdown) as Array<keyof typeof breakdown>).map((cat) => {
                                const rate = breakdown[cat];
                                return (
                                    <div key={cat} className={styles.categoryItem}>
                                        <div className={styles.categoryInfo}>
                                            <span className={styles.categoryName}>{cat}</span>
                                            <span className={styles.categoryPercentage}>{rate}%</span>
                                        </div>
                                        <div className={styles.categoryBarTrack}>
                                            <div
                                                className={styles.categoryBarFill}
                                                style={{
                                                    width: `${rate}%`,
                                                    background: categoryColors[cat] || 'var(--timeline-color-1)'
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
