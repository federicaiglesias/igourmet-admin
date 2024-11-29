import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewAdmin() {
  const admin = useSelector((state) => state.admin);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAdmin = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/admins`,
        data: { firstname, lastname, email, password },
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/administradores");
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleCreateAdmin}
        >
          <h2 className="mb-4 text-center">Nuevo Administrador</h2>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                placeholder="Ingrese su nombre"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                placeholder="Ingrese su apellido"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="rounded p-2">
              Crear administrador
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewAdmin;
