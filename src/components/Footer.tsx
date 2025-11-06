export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          © 2025 English Center Pro Admin Panel
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a 
            href="#" 
            className="text-sm text-[#2563EB] hover:underline"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="#" 
            className="text-sm text-[#2563EB] hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}
