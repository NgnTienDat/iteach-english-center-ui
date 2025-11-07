import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { usePasswordContext } from '../../contexts/PasswordContext';

interface VerifyOTPProps {
  onBack: () => void;
  onNext: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ onBack, onNext }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const { t } = useTranslation();
    
    // Use the password context (shared state)
    const { verifyOTP, isVerifyingOTP, email, error, clearError, resendOTP, isSendingOTP } = usePasswordContext();

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Clear error when user types
            if (error) {
                clearError();
            }

            // Auto-focus next input
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = () => {
        const otpString = otp.join('');
        
        // Call verifyOTP API with shared email from context
        verifyOTP({ email, otp: otpString });
        onNext();
    };

    const handleResend = () => {
        // Clear OTP inputs
        setOtp(['', '', '', '', '', '']);
        // Focus first input
        document.getElementById('otp-0')?.focus();
        // Resend OTP using shared email from context
        resendOTP();
    };

    return (
        <>
            <div className="flex justify-end mb-8">
                <LanguageSwitcher />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {t('forgot_password.verify_otp_title')}
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    {t('forgot_password.verify_otp_description')}
                </p>

                <div className="space-y-6">
                    <div>
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    maxLength={1}
                                    className={`w-12 h-12 text-center text-xl font-medium border rounded-xl focus:outline-none transition ${
                                        digit ? 'border-blue-500 bg-blue-50' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    disabled={isVerifyingOTP}
                                />
                            ))}
                        </div>
                        {/* Display API error */}
                        {error && (
                            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600 text-center">
                                    {error}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isVerifyingOTP || otp.some(d => !d)}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isVerifyingOTP ? 
                            <span>{t('forgot_password.verify_otp_verifying')}</span> 
                            : 
                            <span>{t('forgot_password.verify_otp_button')}</span>
                        }
                    </button>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-600">
                            {t('forgot_password.not_received_otp')}{' '}
                            <button
                                onClick={handleResend}
                                disabled={isSendingOTP || isVerifyingOTP}
                                className="text-blue-600 hover:text-blue-700 font-medium disabled:text-blue-400"
                            >
                                {isSendingOTP ? t('forgot_password.send_otp_sending') : t('forgot_password.resend_otp')}
                            </button>
                        </p>
                        <button
                            onClick={onBack}
                            disabled={isVerifyingOTP}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium block mx-auto"
                        >
                            {t('forgot_password.back_to_forgot_password')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyOTP;
