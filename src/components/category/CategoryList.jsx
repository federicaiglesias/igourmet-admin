import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/categories`,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/categories/${id}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
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
          text: "La categoría ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="container content-box">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h3 className="card-title">Categorías</h3>
              <Link to="/nueva-categoria">
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
                      <th>Fecha de creación</th>
                      <th>Fechad de edición</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr
                        key={category.id}
                        className={
                          index % 2 === 0 ? "row-custom-1" : "row-custom-2"
                        }
                      >
                        <td className="py-1 px-1">{category.id}</td>
                        <td>{category.name}</td>
                        <td>{new Date(category.createdAt).toLocaleString()}</td>
                        <td>{new Date(category.updatedAt).toLocaleString()}</td>
                        <td className="d-flex justify-content-start">
                          <Link
                            to={`/editar-categoria/${category.id}`}
                            className="btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square me-3"></i>
                          </Link>
                          <i
                            className="bi bi-trash3 text-danger btn-sm btn-outline-danger cursor-trash"
                            onClick={() => handleSweetAlert(category.id)}
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

export default CategoryList;
