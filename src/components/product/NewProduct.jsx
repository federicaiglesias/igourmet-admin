import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewProduct() {
  const admin = useSelector((state) => state.admin);
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateProduct = async (data) => {
    try {
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/products`,
        data: data,
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
          onSubmit={handleSubmit(handleCreateProduct)}
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
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger">Por favor, insertar nombre.</p>
              )}
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
                {...register("subdescription", { required: true })}
              />
              {errors.subdescription?.type === "required" && (
                <p className="text-danger">
                  Por favor, insertar subdescripción.
                </p>
              )}
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
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p className="text-danger">Por favor, insertar precio.</p>
              )}
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
                {...register("stock", { required: true })}
              />
              {errors.stock?.type === "required" && (
                <p className="text-danger">Por favor, insertar stock.</p>
              )}
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
                {...register("subcategory", { required: true })}
              />
              {errors.subcategory?.type === "required" && (
                <p className="text-danger">Por favor, insertar subcategoría.</p>
              )}
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
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">Por favor, insertar descripción.</p>
              )}
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
                {...register("image", { required: true })}
              />
              {errors.image?.type === "required" && (
                <p className="text-danger">Por favor, insertar imagen.</p>
              )}
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
                {...register("slug", { required: true })}
              />
              {errors.slug?.type === "required" && (
                <p className="text-danger">Por favor, insertar slug.</p>
              )}
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
                onChange={() => setFeatured(!featured)}
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
