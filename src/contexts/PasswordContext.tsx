import { createContext, useContext, type ReactNode } from "react";
import usePassword from "../hooks/usePassword";

interface PasswordContextType {
    sendOTP: (variables: string) => void;
    isSendingOTP: boolean;
    isOTPSent: boolean;
    verifyOTP: (variables: { email: string; otp: string }) => void;
    isVerifyingOTP: boolean;
    isOTPVerified: boolean;
    resetPassword: (variables: { email: string; token: string; newPassword: string }) => void;
    isResettingPassword: boolean;
    isPasswordReset: boolean;
    error: string | null;
    clearError: () => void;
    email: string;
    token: string;
    resendOTP: () => void;
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

interface PasswordProviderProps {
    children: ReactNode;
}

export const PasswordProvider: React.FC<PasswordProviderProps> = ({ children }) => {
    const passwordHook = usePassword();

    return (
        <PasswordContext.Provider value={passwordHook}>
            {children}
        </PasswordContext.Provider>
    );
};

export const usePasswordContext = (): PasswordContextType => {
    const context = useContext(PasswordContext);
    if (!context) {
        throw new Error('usePasswordContext must be used within PasswordProvider');
    }
    return context;
};
