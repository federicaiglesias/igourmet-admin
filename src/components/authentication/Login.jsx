import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/adminSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/token`,
        data: { email, password },
      });

      if (response.data.token) {
        dispatch(login(response.data));
        navigate(location.state ? location.state : "/");
      } else {
        toast.error("Credenciales incorrectas. Por favor, verifica tus datos.");
      }
    } catch (err) {
      toast.error("Credenciales incorrectas. Por favor, verifica tus datos.");
    }
  };

  return (
    <>
      <div className="login-container vh-100 d-flex justify-content-center align-items-center ">
        <div className="row w-75  g-0 shadow small-screens">
          <div className="col-md-5 col-lg-7 d-md-flex left-col p-4 flex-column justify-content-between rounded-start login-image">
            <img src="logo-igourmet.jpg" alt="Logo" className="signup-logo" />
          </div>

          <div className="col-12 col-lg-5 corners bg-white d-flex flex-column align-items-center justify-content-center px-2 px-lg-4">
            <div className="form-container w-75">
              <h2 className="text-start title-login mb-4">
                Iniciar sesión como administrador
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label hidden htmlFor="email">
                    Correo electónico:
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Ingresá tu correo electónico"
                    className="form-control w-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label hidden htmlFor="password">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingresá tu contraseña"
                    className="form-control w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="w-100 mb-3 rounded">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
