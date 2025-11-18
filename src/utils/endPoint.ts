export const endpoints = {
    LOG_IN: '/auth/login' as const,
    LOG_OUT: '/auth/logout' as const,
    SEND_OTP: '/auth/send-otp' as const,
    VERIFY_OTP: '/auth/verify-otp' as const,
    RESET_PASSWORD: '/auth/reset-password' as const,
    INTROSPECT_TOKEN: '/auth/introspect' as const,
    REFRESH_TOKEN: '/auth/refresh' as const,

    MY_INFO: '/api/v1/users/my-info' as const,
    ALL_USERS: '/api/v1/users/' as const,

    CREATE_PARENT: '/api/v1/users/parents' as const,
    UPDATE_PARENT: (userId: string) => `/api/v1/users/parents/${userId}` as const,
    ALL_PARENTS: '/api/v1/users/parents' as const,

    CREATE_STUDENT: '/api/v1/users/student' as const,
    STUDENT_DETAIL: (userId: string) => `/api/v1/users/students/${userId}` as const,
    ALL_STUDENTS: '/api/v1/users/students' as const,
    ALL_STUDENTS_AVAILABLE: '/api/v1/users/student-available' as const,

    ALL_COURSES: '/api/v1/courses/' as const,
    CREATE_COURSE: '/api/v1/courses' as const,
    UPDATE_COURSE: (courseId: string) => `/api/v1/courses/${courseId}` as const,
    DELETE_COURSE: (courseId: string) => `/api/v1/courses/${courseId}` as const,

    ALL_CLASSES: '/api/v1/classes' as const,
    CREATE_CLASS: '/api/v1/classes' as const,
    UPDATE_CLASS: (classId: string) => `/api/v1/classes/${classId}` as const,
    DELETE_CLASS: (classId: string) => `/api/v1/classes/${classId}` as const,
    CLASS_BY_COURSE: (courseId: string) => `/api/v1/classes/course/${courseId}` as const,
};
