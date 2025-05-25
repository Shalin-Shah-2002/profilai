import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("AuthSuccess component mounted");
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved to localStorage:", token);
      navigate("/dashboard");
    } else {
      console.warn("No token found in URL. Redirecting to /");
      navigate("/");
    }
  }, [location, navigate]);

  return <p>Logging you in...</p>;
};

export default AuthSuccess;
