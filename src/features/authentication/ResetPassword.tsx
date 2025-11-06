import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { usePasswordContext } from "../../contexts/PasswordContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";


interface ResetPasswordProps {
  onBack: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBack }) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>('');
    const { t } = useTranslation();

    // Use the password context (shared state)
    const { resetPassword, isResettingPassword, email, token, error, clearError } = usePasswordContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setValidationError('Password must be at least 8 characters');
            return;
        }

        // Call resetPassword API with shared email and token from context
        resetPassword({ email, token, newPassword });
    };

    const handlePasswordChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        if (validationError) {
            setValidationError('');
        }
        if (error) {
            clearError();
        }
    };

    return (
        <>
            <div className="flex justify-end mb-8">
                <LanguageSwitcher />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {t('forgot_password.reset_password_title')}
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    {t('forgot_password.reset_password_description')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password Field */}
                    <div>
                        <label
                            className="block text-sm text-left font-medium text-gray-900 mb-2"
                            htmlFor="new-password"
                        >
                            {t('forgot_password.reset_password_new')}
                        </label>
                        <div className="relative">
                            <input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={handlePasswordChange(setNewPassword)}
                                className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-xl transition placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                placeholder={t('forgot_password.reset_password_new_placeholder')}
                                disabled={isResettingPassword}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                disabled={isResettingPassword}
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label
                            className="block text-sm text-left font-medium text-gray-900 mb-2"
                            htmlFor="confirm-password"
                        >
                            {t('forgot_password.reset_password_confirm')}
                        </label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handlePasswordChange(setConfirmPassword)}
                                className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-xl transition placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                placeholder={t('forgot_password.reset_password_confirm_placeholder')}
                                disabled={isResettingPassword}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                disabled={isResettingPassword}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Display validation or API error */}
                    {(validationError || error) && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600 text-left">
                                {validationError || error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isResettingPassword || !newPassword || !confirmPassword}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isResettingPassword
                            ? t('forgot_password.reset_password_resetting')
                            : t('forgot_password.reset_password_button')}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        {t('forgot_password.note')}
                    </p>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;