import Cookies from "universal-cookie";

const cookies = new Cookies();
const AUTH_TOKEN_KEY = 'auth_token';

interface CookieOptions {
    path: string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
}

export const setCookieToken = (token: string): void => {
    const options: CookieOptions = {
        path: '/',
        maxAge: 36000,
        secure: true,
        sameSite: 'strict',
    };
    cookies.set(AUTH_TOKEN_KEY, token, options);
};

export const getAccessToken = (): string | null => {
    return cookies.get(AUTH_TOKEN_KEY) || null;
};

export const AuthenticationHeader = (): Record<string, string> => {
    const accessToken = getAccessToken();
    if (!accessToken) return {};
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

export const removeCookieToken = (): void => {
    cookies.remove(AUTH_TOKEN_KEY, { path: '/' });
};
