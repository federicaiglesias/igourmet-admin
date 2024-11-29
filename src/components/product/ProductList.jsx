import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./product.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios({
        method: "GET",
        url: `${
          import.meta.env.VITE_API_URL
        }/products?categoryId=${selectedCategory}`,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleDelete = async (slug) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/products/${slug}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.slug !== slug)
    );
  };
  const handleSweetAlert = (slug) => {
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
        handleDelete(slug);
        Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="container-fluid container-fluid-adjusted">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h3 className="card-title">Productos</h3>
              <Link to="/nuevo-producto">
                <button className="rounded px-2">
                  <i className="bi bi-plus-circle me-1"></i> Crear
                </button>
              </Link>
            </div>
            <div className="card-body p-0 ">
              <div className="table-responsive table-responsive-adjusted">
                <table className="w-100">
                  <thead className="">
                    <tr>
                      <th className="col-width-s p-2 ps-3">#</th>
                      <th className="col-width-s">Nombre</th>
                      <th className="col-width-s">Precio</th>
                      <th className="col-width-s">Stock</th>
                      <th className="col-width">Descripción</th>
                      <th className="col-width-m pe-2">Subdescripción</th>
                      <th className="col-width-s ps-2">Subcategoría</th>
                      <th className="col-width-s">Imagen</th>
                      <th className="col-width-s">Destacado</th>
                      <th className="col-width-m">Slug</th>
                      <th className="col-width-m">Fecha de reación</th>
                      <th className="col-width-m">Fecha de actualización</th>
                      <th className="col-width-s">ID Categoría</th>
                      <th className="col-width-m">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={product.id}
                        className={
                          index % 2 === 0 ? "row-custom-1" : "row-custom-2"
                        }
                      >
                        <td className="col-width-s ps-3">{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td className="col-width pe-2">
                          {product.description}
                        </td>
                        <td className="ps-2">{product.subdescription}</td>
                        <td>{product.subcategory}</td>
                        <td>{product.image}</td>
                        <td>{product.featured ? "Sí" : "No"}</td>
                        <td>{product.slug}</td>
                        <td>{new Date(product.createdAt).toLocaleString()}</td>
                        <td>{new Date(product.updatedAt).toLocaleString()}</td>
                        <td>{product.categoryId}</td>
                        <td className="d-flex justify-content-start">
                          <Link
                            to={`/editar-producto/${product.slug}`}
                            className="btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square me-3"></i>
                          </Link>
                          <i
                            className="bi bi-trash3 text-danger cursor-trash"
                            onClick={() => handleSweetAlert(product.slug)}
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

export default ProductList;
