import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            background: 'rgba(30, 41, 59, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '18px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <AlertCircle size={32} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>
              Something Went Wrong
            </h2>

            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
              The application encountered a temporary display issue. Click below to reload or return home.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <RefreshCw size={16} /> Reload Page
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Home size={16} /> Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
