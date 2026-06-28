import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useDecisionStore } from '../../stores/decisionStore';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const GEMINI_MODELS = [
    { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro', description: 'Best for complex reasoning' },
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', description: 'Fast & efficient' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Stable & reliable' },
];

export default function Layout({ children }: LayoutProps) {
    const { user, logout } = useAuthStore();
    const { decisions, fetchDecisions } = useDecisionStore();
    const { theme, toggleTheme } = useTheme();
    const { isMuted, toggleMute, playSound } = useSound();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(GEMINI_MODELS[0]);

    useEffect(() => {
        fetchDecisions();
    }, [fetchDecisions]);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isPathActive = (path: string) => location.pathname === path;

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`} aria-label="Main Navigation">
                <div className={styles.sidebarContent}>
                    {/* Model Dropdown (only when expanded) */}
                    {sidebarOpen && (
                        <div className={styles.modelSection}>
                            <div className={styles.modelDropdownWrapper}>
                                <button
                                    className={styles.modelDropdownBtn}
                                    onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                                    aria-haspopup="listbox"
                                    aria-expanded={modelDropdownOpen}
                                >
                                    <span>{selectedModel.name}</span>
                                    <span className={styles.dropdownArrow}>▾</span>
                                </button>
                                {modelDropdownOpen && (
                                    <div className={styles.modelDropdown} role="listbox">
                                        {GEMINI_MODELS.map(model => (
                                            <button
                                                key={model.id}
                                                className={`${styles.modelOption} ${selectedModel.id === model.id ? styles.modelSelected : ''}`}
                                                role="option"
                                                aria-selected={selectedModel.id === model.id}
                                                onClick={() => {
                                                    playSound('click');
                                                    setSelectedModel(model);
                                                    setModelDropdownOpen(false);
                                                    localStorage.setItem('preferredModel', model.id);
                                                }}
                                            >
                                                <span className={styles.modelName}>{model.name}</span>
                                                <span className={styles.modelDesc}>{model.description}</span>
                                                {selectedModel.id === model.id && <span className={styles.modelCheck}>✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* New Decision Gradient Button */}
                    <button
                        className={styles.newChatBtn}
                        onClick={() => { playSound('click'); navigate('/dashboard'); }}
                        title="New Decision"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        {sidebarOpen && <span>New Decision</span>}
                    </button>

                    {/* Scrollable History Section */}
                    {sidebarOpen && (
                        <div className={styles.historySection}>
                            <h3 className={styles.historyTitle}>Your Decisions</h3>
                            <div className={styles.historyList}>
                                {decisions.map((d) => {
                                    const active = isPathActive(`/decision/${d.id}`);
                                    return (
                                        <button
                                            key={d.id}
                                            className={`${styles.historyItem} ${active ? styles.modelSelected : ''}`}
                                            onClick={() => { playSound('click'); navigate(`/decision/${d.id}`); }}
                                            title={d.content}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                            <span className={styles.historyText}>{d.content}</span>
                                        </button>
                                    );
                                })}
                                {decisions.length === 0 && (
                                    <p className={styles.historyEmpty}>No decisions yet</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Footer - Profile & Actions */}
                <div className={styles.sidebarFooter}>
                    {sidebarOpen ? (
                        <>
                            <Link to="/profile" className={`${styles.profileLink} ${isPathActive('/profile') ? styles.modelSelected : ''}`} title="Profile Settings">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className={styles.userName}>{user?.name || user?.email?.split('@')[0]}</span>
                            </Link>
                            <button
                                onClick={() => { playSound('click'); toggleMute(); }}
                                className={styles.muteBtn}
                                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                            >
                                {isMuted ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    </svg>
                                )}
                            </button>
                            <button onClick={() => { playSound('click'); logout(); }} className={styles.logoutBtn} title="Logout">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center' }}>
                            <Link to="/profile" className={styles.iconBtn} title="Profile">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>
                            <button
                                onClick={() => { playSound('click'); toggleMute(); }}
                                className={styles.iconBtn}
                                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                            >
                                {isMuted ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    </svg>
                                )}
                            </button>
                            <button onClick={() => { playSound('click'); logout(); }} className={styles.iconBtn} title="Logout">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Collapsible toggle switch */}
                <button
                    className={styles.sidebarToggle}
                    onClick={() => { playSound('click'); setSidebarOpen(!sidebarOpen); }}
                    title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {sidebarOpen ? (
                            <polyline points="15 18 9 12 15 6" />
                        ) : (
                            <polyline points="9 18 15 12 9 6" />
                        )}
                    </svg>
                </button>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && <div className={styles.mobileOverlay} onClick={() => setSidebarOpen(false)} />}

            {/* Main Content */}
            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => { playSound('click'); setSidebarOpen(!sidebarOpen); }}
                        aria-label="Toggle Menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    <Link to="/dashboard" className={styles.headerLogo} aria-label="WhatIF Dashboard Home">
                        <img src="/icon.png" alt="WhatIF Logo" className={styles.headerLogoImg} />
                    </Link>

                    <button onClick={() => { playSound('click'); toggleTheme(); }} className={styles.themeToggle} title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                        {theme === 'light' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>
                </header>

                <main className={styles.main}>
                    {children}
                </main>

                <footer className={styles.footer}>
                    <p>
                        <span className={styles.footerBrand}>WhatIF</span>
                        <span className={styles.footerDivider}>•</span>
                        Experience the future before you choose it
                        <span className={styles.footerDivider}>•</span>
                        <button
                            onClick={() => { playSound('click'); toggleMute(); }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: isMuted ? 'rgba(255, 255, 255, 0.4)' : '#8B5CF6',
                                cursor: 'pointer',
                                font: 'inherit',
                                padding: 0,
                                fontWeight: '600',
                                outline: 'none',
                                textDecoration: 'underline',
                                transition: 'color 0.2s'
                            }}
                            title={isMuted ? 'Turn sounds ON' : 'Turn sounds OFF'}
                        >
                            Sound: {isMuted ? 'OFF 🔇' : 'ON 🔊'}
                        </button>
                    </p>
                </footer>
            </div>
        </div>
    );
}
