import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditProduct() {
  const { slug } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${slug}`
        );
        setValue("name", response.data.name);
        setValue("subdescription", response.data.subdescription);
        setValue("price", response.data.price);
        setValue("stock", response.data.stock);
        setValue("subcategory", response.data.subcategory);
        setValue("description", response.data.description);
        setValue("image", response.data.image);
        setValue("slug", response.data.slug);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleUpdateProduct = async (data) => {
    try {
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/products/${slug}`,
        data: data,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/productos");
    } catch (err) {
      console.error("Error al editar producto:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-3 rounded shadow"
          onSubmit={handleSubmit(handleUpdateProduct)}
        >
          <h2 className="mb-4 text-center">Editar Producto</h2>
          <div className="row">
            {/* Fila 1: Nombre y Subdescripción */}
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Ingrese nombre"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger font-size-error">Por favor, insertar nombre.</p>
              )}
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="subdescription" className="form-label">
                Subdescripción
              </label>
              <input
                type="text"
                id="subdescription"
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
            {/* Fila 3: Descripción */}
            <div className="col-12 mb-3">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                id="description"
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
            {/* Fila 4: Imagen y Slug */}
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input
                type="text"
                id="image"
                className="form-control"
                placeholder="Ingrese imagen"
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
                className="form-control"
                placeholder="Ingrese slug"
                {...register("slug", { required: true })}
              />
              {errors.slug?.type === "required" && (
                <p className="text-danger">Por favor, insertar slug.</p>
              )}
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label htmlFor="featured" className="form-label me-3">
                Destacado
              </label>
              <input
                type="checkbox"
                id="featured"
                className="form-check-input"
                checked={productInfo.featured}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, featured: e.target.checked })
                }
              />
            </div>
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

export default EditProduct;
