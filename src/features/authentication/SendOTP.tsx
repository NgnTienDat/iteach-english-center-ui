import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { usePasswordContext } from "../../contexts/PasswordContext";

interface SendOTPProps {
  onBack: () => void;
  onNext: () => void;
}

const SendOTP: React.FC<SendOTPProps> = ({ onBack, onNext }) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const { t } = useTranslation();
    
    const { sendOTP, isSendingOTP, error, clearError } = usePasswordContext();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        if (emailError) {
            setEmailError('');
        }
        if (error) {
            clearError();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate email before submitting
        if (!email) {
            setEmailError('Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            setEmailError("Please include an '@' in the email address. '" + email + "' is missing an '@'.");
            return;
        }

        // Call sendOTP API
        sendOTP(email);
        onNext();
    };

    return (
        <>
            <div className="flex justify-end mb-8">
                <LanguageSwitcher />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {t('forgot_password.send_otp_title')}
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    {t('forgot_password.send_otp_description')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-left font-medium text-gray-900 mb-2" htmlFor="reset-email">
                            Email
                        </label>
                        <input
                            id="reset-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full px-4 py-3 bg-gray-100 border rounded-xl transition placeholder-gray-400 ${
                                emailError || error
                                    ? 'border-red-500 ring-1 ring-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300'
                            }`}
                            placeholder={t('inputs.email.placeholder')}
                            disabled={isSendingOTP}
                        />
                        {/* Display validation error */}
                        {emailError && (
                            <div className="mt-2 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2">
                                <div className="shrink-0 bg-orange-500 text-white rounded px-1.5 py-0.5 text-xs font-bold mt-0.5">
                                    !
                                </div>
                                <p className="text-xs text-orange-800 text-left flex-1">
                                    {emailError}
                                </p>
                            </div>
                        )}
                        {/* Display API error */}
                        {error && !emailError && (
                            <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-2">
                                <p className="text-xs text-red-600 text-left flex-1">
                                    {error}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSendingOTP || !email || !email.trim()}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isSendingOTP ? 
                            <span>{t('forgot_password.send_otp_sending')}</span> 
                            : 
                            <span>{t('forgot_password.send_otp_button')}</span>
                        }
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={isSendingOTP}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('forgot_password.back_to_login')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SendOTP;
