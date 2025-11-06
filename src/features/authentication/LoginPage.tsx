import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLogin from '../../hooks/useLogin';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { t } = useTranslation();

    const { login, isPending, error, clearError } = useLogin();

    const handleSubmit = () => {
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
        <div className="flex rounded-2xl shadow-lg max-w-5xl w-full overflow-hidden h-[700px]">
            {/* Left Section - Blue Background */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
                <div className="text-white max-w-lg">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Connect, Learn,<br />Achieve Together!
                    </h1>
                    <p className="text-xl text-blue-100">
                        Join iConnect to learn, grow, and connect through fun activities.
                    </p>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 rounded-tl-3xl rounded-bl-3xl">
                <div className="w-full max-w-md">
                    {/* Language Switcher */}
                    <div className="flex justify-end mb-8">
                        <LanguageSwitcher />
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-8">
                            {t('login.title')}
                        </h2>

                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label
                                    className="block text-sm text-left font-medium text-gray-900 mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className={`w-full px-4 py-2 bg-gray-100 border rounded-xl transition placeholder-gray-400 ${
                                        error
                                            ? 'border-red-500 ring-1 ring-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300'
                                    }`}
                                    placeholder={t('inputs.email.placeholder')}
                                    disabled={isPending}
                                />
                                {error && (
                                    <p className="text-xs text-red-600 mt-1 text-left">
                                        Email or password is incorrect, please try again!
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    className="block text-sm text-left font-medium text-gray-900 mb-2"
                                    htmlFor="password"
                                >
                                    {t('login.password')}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className={`w-full px-4 py-2 bg-gray-100 border rounded-xl transition placeholder-gray-400 ${
                                        error
                                            ? 'border-red-500 ring-1 ring-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                    disabled={isPending}
                                />
                                {error && (
                                    <p className="text-xs text-red-600 mt-1 text-left">
                                        Email or password is incorrect, please try again!
                                    </p>
                                )}
                                <div className="text-right mt-2">
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        {t('login.forgot_password')}
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isPending}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <span>{t('login.loading')}</span>
                                ) : (
                                    <span>{t('login.button')}</span>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-gray-600">
                                {t('login.no_account')}{' '}
                                <a
                                    href="https://iteach.edu.vn/"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    {t('login.contact_us')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;