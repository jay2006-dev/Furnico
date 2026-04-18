import { useState, useContext } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // If the user was redirected from another page, go back there after login
  const redirectTo = location.state?.from || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let data;
      if (isRegister) {
        data = await registerUser(formData);
      } else {
        data = await loginUser(formData);
      }
      login(data);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Luxury Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-luxury-white px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-luxury-black mb-4">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="font-sans font-light text-luxury-gray">
              {isRegister 
                ? "Join our exclusive community of luxury furniture enthusiasts." 
                : "Sign in to access your orders and saved collections."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-600 text-sm font-sans">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            {isRegister && (
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Full Name</label>
                <input
                  type="text"
                  required
                  className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <Button type="submit" variant="primary" className="mt-4 w-full">
              {isRegister ? "Register" : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="font-sans text-sm text-neutral-500">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-luxury-black font-medium hover:underline underline-offset-4 ml-2 transition-all"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setFormData({ name: "", email: "", password: "" });
                  setError("");
                }}
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
