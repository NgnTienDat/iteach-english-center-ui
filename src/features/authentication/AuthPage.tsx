import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SendOTP from './SendOTP';
import VerifyOTP from './VerifyOTP';
import ResetPassword from './ResetPassword';
import AuthLayout from '../../layout/AuthLayout';
import { PasswordProvider } from '../../contexts/PasswordContext';


type ViewType = 'login' | 'sendOTP' | 'verifyOTP' | 'resetPassword';

const AuthPage: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('login');

    const renderView = () => {
        switch (currentView) {
            case 'login':
                return (
                    <LoginForm
                        onForgotPassword={() => setCurrentView('sendOTP')}
                    />
                );
            case 'sendOTP':
                return (
                    <SendOTP
                        onBack={() => setCurrentView('login')}
                        onNext={() => setCurrentView('verifyOTP')}
                    />
                );
            case 'verifyOTP':
                return (
                    <VerifyOTP
                        onBack={() => setCurrentView('sendOTP')}
                        onNext={() => setCurrentView('resetPassword')}
                    />
                );
            case 'resetPassword':
                return (
                    <ResetPassword
                        onBack={() => setCurrentView('login')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <AuthLayout>
                <PasswordProvider>
                    {renderView()}
                </PasswordProvider>
            </AuthLayout>
        </div>
    );
};

export default AuthPage;