import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditAdmin() {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [adminInfo, setAdminInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setAdminInfo(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleUpdateAdmin = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
        data: adminInfo,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/administradores");
    } catch (err) {
      console.error("Error al editar administrador:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleUpdateAdmin}
        >
          <h2 className="mb-4 text-center">Editar Administrador</h2>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                placeholder="Ingrese su nombre"
                value={adminInfo.firstname}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, firstname: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                placeholder="Ingrese su apellido"
                value={adminInfo.lastname}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, lastname: e.target.value })
                }
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
              value={adminInfo.email}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, email: e.target.value })
              }
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
              value={adminInfo.password}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, password: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="rounded p-2">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAdmin;
