import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: { componentStack?: string | null }) {
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div
                    role="alert"
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        gap: '1rem',
                        textAlign: 'center',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Something went wrong</h1>
                    <p style={{ margin: 0, opacity: 0.8 }}>
                        The page hit an unexpected error. You can return to the home page and try again.
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReset}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid currentColor',
                            background: 'transparent',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            font: 'inherit',
                        }}
                    >
                        Go to home
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
