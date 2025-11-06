
// export const endpoints = {
//     LOG_IN: '/auth/login',
//     LOG_OUT: '/auth/logout',
//     SEND_OTP: '/auth/send-otp',
//     VERIFY_OTP: '/auth/verify-otp',
//     RESET_PASSWORD: '/auth/reset-password',
//     INTROSPECT_TOKEN: '/auth/introspect',
//     REFRESH_TOKEN: '/auth/refresh',
//     MY_INFO: '/api/v1/users/my-info',
// }


export const endpoints = {
    LOG_IN: '/auth/login' as const,
    LOG_OUT: '/auth/logout' as const,
    SEND_OTP: '/auth/send-otp' as const,
    VERIFY_OTP: '/auth/verify-otp' as const,
    RESET_PASSWORD: '/auth/reset-password' as const,
    INTROSPECT_TOKEN: '/auth/introspect' as const,
    REFRESH_TOKEN: '/auth/refresh' as const,
    MY_INFO: '/api/v1/users/my-info' as const,
};