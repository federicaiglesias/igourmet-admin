import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders`,
          {
            headers: { Authorization: `Bearer ${admin.token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [admin.token]);

  return (
    <div className="container-fluid content-box">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-white">
              <h3 className="card-title">Órdenes</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive rounded">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="p-2">#</th>
                      <th>Items</th>
                      <th>Información de envío</th>
                      <th>Información de contacto</th>
                      <th>Pago</th>
                      <th>Estado</th>
                      <th>Fecha de creación</th>
                      <th>Fecha de edición</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id} className={
                        index % 2 === 0 ? "row-custom-1" : "row-custom-2"
                      }>
                        <td className="py-1 px-1">{order.id}</td>
                        <td>{order.items.length}</td>
                        <td>{order.shippingInfo.address}</td>
                        <td>{order.contactInfo.email}</td>
                        <td>{order.paymentInfo.cardNumber}</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{new Date(order.updatedAt).toLocaleString()}</td>
                        <td className="d-flex justify-content-center">
                          <Link
                            to={`/editar-orden/${order.id}`}
                            className="btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square me-3"></i>
                          </Link>
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

export default OrderList;
