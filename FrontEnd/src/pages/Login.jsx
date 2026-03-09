import { useState, useContext } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isRegister) {
        data = await registerUser(formData);
      } else {
        data = await loginUser(formData);
      }
      login(data);
      navigate("/");
    } catch (err) {
      alert("Invalid Credentials");
      console.log(err);
    }
  };
  return (
    <div>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={submitHandler}>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></input>
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Paswword"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setFormData({ name: "", email: "", password: "" });
          }}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Login;
