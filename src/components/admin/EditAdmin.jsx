import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditAdmin() {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        console.log(response.data);
        setValue( "firstname", response.data.firstname );
        setValue( "lastname", response.data.lastname );
        setValue( "email", response.data.email );
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleUpdateAdmin = async (data) => {
    try {
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
        data: data,
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
          onSubmit={handleSubmit(handleUpdateAdmin)}
        >
          <h2 className="mb-4 text-center">Editar Administrador</h2>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                placeholder="Ingrese su nombre"
                {...register("firstname", { required: true })}
              />
              {errors.firstname?.type === "required" && (
                <p className="text-danger font-size-error">Por favor, insertar nombre.</p>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastname" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                placeholder="Ingrese su apellido"
                {...register("lastname", { required: true })}
              />
              {errors.lastname?.type === "required" && (
                <p className="text-danger font-size-error">Por favor, insertar apellido.</p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su correo electrónico"
              {...register("email", {
                required: true,
                pattern: /([\w\.]+)@([\w\.]+)\.(\w+)/gi,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger font-size-error">
                Por favor, insertar correo electrónico.
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-danger font-size-error">Formato incorrecto.</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger font-size-error">Por favor, insertar contraseña.</p>
            )}
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
