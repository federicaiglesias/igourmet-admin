import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/admins`,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setAdmins(response.data);
    };
    fetchAdmin();
  }, []);

  const handleDelete = async (id) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };
  const handleSweetAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire({
          title: "Eliminado",
          text: "El administrador ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="container-fluid content-box">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h3 className="card-title">Administradores</h3>
              <Link to="/nuevo-administrador">
                <button className="rounded px-2">
                  <i className="bi bi-plus-circle me-1"></i> Crear
                </button>
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="p-2">#</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo electrónico</th>
                      <th>Fecha de creación</th>
                      <th>Fecha de edición</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, index) => (
                      <tr
                        key={admin.id}
                        className={
                          index % 2 === 0 ? "row-custom-1" : "row-custom-2"
                        }
                      >
                        <td className="py-1 px-1">{admin.id}</td>
                        <td>{admin.firstname}</td>
                        <td>{admin.lastname}</td>
                        <td>{admin.email}</td>
                        <td>{new Date(admin.createdAt).toLocaleString()}</td>
                        <td>{new Date(admin.updatedAt).toLocaleString()}</td>
                        <td className="d-flex justify-content-start">
                          <Link
                            to={`/editar-administrador/${admin.id}`}
                            className="btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square me-3"></i>
                          </Link>
                          <i
                            className="bi bi-trash3 text-danger cursor-trash"
                            onClick={() => handleSweetAlert(admin.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminList;
