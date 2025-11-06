import { Outlet } from 'react-router-dom';

/**
 * Layout dành cho Parent (Phụ huynh)
 */
const ParentLayout = () => {
    return (
        <div className="p-4 bg-green-50 min-h-screen">
            <h1 className="text-2xl font-bold text-green-700 border-b pb-2 mb-4">Parent Layout (Header & Sidebar here)</h1>
            <Outlet />
        </div>
    );
};

export default ParentLayout;
