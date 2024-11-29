import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const admin = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [subdescription, setSubdescription] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  const handleCreateProduct = async (e) => {
    const formData = new FormData(e.target);
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/products`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      navigate("/productos");
    } catch (err) {
      console.error("Error al crear producto:", err);
    }
  };
  return (
    <>
      {" "}
      <div className="container content-box">
        <form
          className="p-3 rounded shadow bg-white"
          onSubmit={handleCreateProduct}
        >
          <h2 className="mb-4 text-center">Nuevo Producto</h2>

          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Ingrese nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="subdescription" className="form-label">
                Subdescripción
              </label>
              <input
                type="text"
                id="subdescription"
                name="subdescription"
                className="form-control"
                placeholder="Ingrese subdescripción"
                value={subdescription}
                onChange={(e) => setSubdescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="form-control"
                placeholder="Ingrese precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4 mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-control"
                placeholder="Ingrese stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4 mb-3">
              <label htmlFor="subcategory" className="form-label">
                Subcategoría
              </label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                className="form-control"
                placeholder="Ingrese subcategoría"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                className="form-control"
                placeholder="Ingrese descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                placeholder="Seleccione imagen"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="slug" className="form-label">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                className="form-control"
                placeholder="Ingrese slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label htmlFor="featured" className="form-label me-2">
                Destacado
              </label>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="form-check-input"
                value={featured}
                checked={featured}
                onChange={(e) => {
                  console.log(e), setFeatured(!featured);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="rounded p-2">
              Crear producto
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewProduct;
