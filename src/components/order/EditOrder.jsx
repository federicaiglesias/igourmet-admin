import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditOrder() {
  const [orderStatus, setOrderStatus] = useState("");
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleStatusChange = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/orders/${id}`,
        data: { status: orderStatus },
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      navigate("/ordenes");
    } catch (err) {
      console.error("Error al editar orden:", err);
    }
  };
  const handleSelectChange = (e) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div className="content-box w-100 me-3">
      <form
        className="bg-white p-4 rounded shadow"
        onSubmit={handleStatusChange}
      >
        <div className="mb-4">
          <label htmlFor="orderStatus" className="form-label mb-3 fs-4">
            Estado de la orden:
          </label>
          <select
            id="orderStatus"
            className="form-select"
            value={orderStatus}
            onChange={handleSelectChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En Proceso</option>
            <option value="Completado">Completado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="rounded p-2">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOrder;
