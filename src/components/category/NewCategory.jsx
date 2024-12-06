import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewCategory() {
  const [name, setName] = useState("");
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const handleCreateCategory = async (data) => {
    try {
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/categories`,
        data: data,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/categorias");
    } catch (err) {
      console.error("Error al crear categoría:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleSubmit(handleCreateCategory)}
        >
          <h2 className="mb-4 text-center">Nueva categoría</h2>
          <div className="mb-3">
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="rounded p-2">
              Crear categoría
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewCategory;
