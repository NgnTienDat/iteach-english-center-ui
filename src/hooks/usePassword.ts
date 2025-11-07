import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { sentOTPApi, verifyOTPApi, resetPasswordApi } from '../services/authServices';

const usePassword = () => {
    const [customError, setCustomError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const {
        mutate: sendOTP,
        isPending: isSendingOTP,
        isSuccess: isOTPSent,
    } = useMutation<any, Error, string>({
        mutationFn: async (emailAddress) => {
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Network timeout')), 10000)
            );
            return Promise.race([sentOTPApi(emailAddress), timeoutPromise]);
        },
        onSuccess: (_, variables) => {
            setCustomError(null);
            setEmail(variables);
        },
        onError: (err) => {
            if (err.message === 'Network timeout') {
                setCustomError('Network error: The request took too long. Please check your connection.');
            } else {
                setCustomError(err.message || 'Failed to send OTP. Please try again.');
            }
        },
    });

    const {
        mutate: verifyOTP,
        isPending: isVerifyingOTP,
        isSuccess: isOTPVerified,
    } = useMutation<string, Error, { email: string; otp: string }>({
        mutationFn: async ({ email: emailAddress, otp }) => {
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Network timeout')), 10000)
            );
            return Promise.race([verifyOTPApi(emailAddress, otp), timeoutPromise]);
        },
        onSuccess: (data) => {
            setCustomError(null);
            setToken(data);
        },
        onError: (err) => {
            if (err.message === 'Network timeout') {
                setCustomError('Network error: The request took too long. Please check your connection.');
            } else {
                setCustomError(err.message || 'Invalid OTP. Please try again.');
            }
        },
    });

    const {
        mutate: resetPassword,
        isPending: isResettingPassword,
        isSuccess: isPasswordReset,
    } = useMutation<any, Error, { email: string; token: string; newPassword: string }>({
        mutationFn: async ({ email: emailAddress, token: resetToken, newPassword }) => {
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Network timeout')), 10000)
            );
            return Promise.race([
                resetPasswordApi(emailAddress, resetToken, newPassword),
                timeoutPromise
            ]);
        },
        onSuccess: () => {
            setCustomError(null);
            setEmail('');
            setToken('');
        },
        onError: (err) => {
            if (err.message === 'Network timeout') {
                setCustomError('Network error: The request took too long. Please check your connection.');
            } else {
                setCustomError(err.message || 'Failed to reset password. Please try again.');
            }
        },
    });

    const clearError = () => setCustomError(null);
    const resendOTP = () => email && sendOTP(email);

    return {
        sendOTP, isSendingOTP, isOTPSent,
        verifyOTP, isVerifyingOTP, isOTPVerified,
        resetPassword, isResettingPassword, isPasswordReset,
        error: customError, clearError, email, token, resendOTP
    };
};

export default usePassword;
