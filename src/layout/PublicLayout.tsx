import { Outlet } from 'react-router-dom';

/**
 * Layout công khai (Public Layout) - Dùng cho các trang không yêu cầu đăng nhập như Login.
 * Nó chỉ đơn giản là một wrapper chứa nội dung của route con.
 */
const PublicLayout = () => {
    return (
        // Wrapper cho trang login/register
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Outlet />
        </div>
    );
};

export default PublicLayout;
