// LoginForm.tsx
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { t } = useTranslation();
    const { login, isPending, error, clearError } = useLogin();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        login({ email, password });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) clearError();
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) clearError();
    };

    return (
        <>
            <div className="flex justify-end mb-8">
                <LanguageSwitcher />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                    {t('login.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-left font-medium text-gray-900 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full px-4 py-3 bg-gray-100 border rounded-xl transition placeholder-gray-400 ${
                                error
                                    ? 'border-red-500 ring-1 ring-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300'
                            }`}
                            placeholder={t('inputs.email.placeholder')}
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-left font-medium text-gray-900 mb-2" htmlFor="password">
                            {t('login.password')}
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full px-4 py-3 pr-12 bg-gray-100 border rounded-xl transition placeholder-gray-400 ${
                                    error
                                        ? 'border-red-500 ring-1 ring-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300'
                                }`}
                                placeholder="••••••••"
                                disabled={isPending}
                                required
                            />
                            {/* Eye icon button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                disabled={isPending}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="text-right mt-2">
                            <button
                                type="button"
                                onClick={onForgotPassword}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                disabled={isPending}
                            >
                                {t('login.forgot_password')}
                            </button>
                        </div>
                    </div>

                    {/* Display error message below password field */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600 text-left">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending || !email || !password}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isPending ? <span>{t('login.loading')}</span> : <span>{t('login.button')}</span>}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {t('login.no_account')}{' '}
                        <a href="https://iteach.edu.vn/" className="text-blue-600 hover:text-blue-700 font-medium">
                            {t('login.contact_us')}
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginForm;