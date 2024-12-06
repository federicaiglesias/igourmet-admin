import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewAdmin() {
  const admin = useSelector((state) => state.admin);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const handleCreateAdmin = async (data) => {
    try {
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/admins`,
        data: data,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/administradores");
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };
  return (
    <>
      <div className="container content-box">
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleSubmit(handleCreateAdmin)}
        >
          <h2 className="mb-4 text-center">Nuevo Administrador</h2>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
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
            <div className="col-12 col-md-6">
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
            />{" "}
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
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger font-size-error">Por favor, insertar contraseña.</p>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="rounded p-2">
              Crear administrador
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewAdmin;
