import React, { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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

      {/* Right Section - Dynamic Content */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
