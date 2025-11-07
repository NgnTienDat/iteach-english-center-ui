import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../services/authServices";
import { removeCookieToken } from "../utils/token";
import { useAuth } from "../contexts/AuthContext";

export default function useLogout() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            removeCookieToken();
            setIsAuthenticated(false);
            setUser(null);
            navigate("/", { replace: true });
        },
        onError: (err: Error) => {
            console.error("Logout failed:", err);
            removeCookieToken();
            setIsAuthenticated(false);
            setUser(null);
            navigate("/auth/login", { replace: true });
        },
    });

    return { logout, isLoggingOut };
}
