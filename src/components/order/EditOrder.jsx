import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditOrder() {
  const [orderStatus, setOrderStatus] = useState("");
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            headers: { Authorization: `Bearer ${admin.token}` },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/orders/${id}`,
        data: { status: orderStatus },
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      if (response.data) return navigate("/ordenes");
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
            disabled={
              order.status === "Completado" || order.status === "Cancelado"
            }
            id="orderStatus"
            className="form-select"
            onChange={handleSelectChange}
          >
            <option selected={order.status === "Pendiente"} value="Pendiente">
              Pendiente
            </option>
            <option selected={order.status === "En proceso"} value="En proceso">
              En Proceso
            </option>
            <option selected={order.status === "Completado"} value="Completado">
              Completado
            </option>
            <option selected={order.status === "Cancelado"} value="Cancelado">
              Cancelado
            </option>
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
