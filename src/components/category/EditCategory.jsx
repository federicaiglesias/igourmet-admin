import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditCategory() {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

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
          `${import.meta.env.VITE_API_URL}/categories/${id}`
        );
        setValue("name", response.data.name);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleUpdateCategory = async (data) => {
    try {
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/categories/${id}`,
        data: data,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/categorias");
    } catch (err) {
      console.error("Error al editar categoría:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleSubmit(handleUpdateCategory)}
        >
          <h2 className="mb-4 text-center">Editar Categoría</h2>

          <div className="row">
            <div className="col-12 mb-3">
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

export default EditCategory;
