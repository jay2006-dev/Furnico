import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/authService";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const Profile = () => {
  const { userInfo, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    place: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          place: data.place || "",
          phone: data.phone || "",
          password: "",
        });
      } catch (err) {
        setError("Failed to fetch profile details.");
      } finally {
        setLoading(false);
      }
    };
    
    if (userInfo) {
      fetchProfile();
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      const updatedUser = await updateUserProfile(formData);
      // Update global context with new info
      login(updatedUser);
      setMessage("Profile updated successfully.");
      setFormData(prev => ({ ...prev, password: "" })); // Clear password field
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="w-8 h-8 border-t-2 border-luxury-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 shadow-sm border border-neutral-100"
        >
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-luxury-black text-white rounded-full flex items-center justify-center text-3xl font-serif mx-auto mb-6">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="font-serif text-3xl text-luxury-black mb-2">My Profile</h1>
            <p className="font-sans text-sm text-luxury-gray font-light">Update your personal information and contact details.</p>
          </div>

          {message && (
            <div className="mb-8 p-4 border border-green-200 bg-green-50 text-green-700 text-sm font-sans text-center">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 border border-red-200 bg-red-50 text-red-700 text-sm font-sans text-center">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

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
                <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  placeholder="+1 (555) 000-0000"
                  className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">City / Place</label>
                <input
                  type="text"
                  value={formData.place}
                  placeholder="E.g., New York, NY"
                  className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 pt-8 border-t border-neutral-100">
              <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Update Password (Optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                className="border-b border-neutral-300 bg-transparent py-2 px-1 font-sans text-luxury-black focus:outline-none focus:border-luxury-black transition-colors"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" variant="primary" className="w-full md:w-auto">
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
