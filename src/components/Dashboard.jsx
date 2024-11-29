import "./dashboard.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const salesData = [
  { month: "Ene", Ventas: 1500 },
  { month: "Feb", Ventas: 600 },
  { month: "Mar", Ventas: 800 },
  { month: "Abr", Ventas: 730 },
  { month: "May", Ventas: 900 },
  { month: "Jun", Ventas: 860 },
  { month: "Jul", Ventas: 1100 },
  { month: "Ago", Ventas: 1400 },
  { month: "Sep", Ventas: 1000 },
  { month: "Oct", Ventas: 1500 },
  { month: "Nov", Ventas: 1800 },
  { month: "Dic", Ventas: 2700 },
];

const productData = [
  { name: "Quesos", Unidades: 2785 },
  { name: "Fiambres", Unidades: 4567 },
  { name: "Tablas", Unidades: 1800 },
];

const AdminDashboard = () => {
  return (
    <div className="container-fluid d-flex justify-content-center content-box">
      <div className="row">
        <div>
          <div>
            {/* Cards de estadísticas */}
            <div className="row justify-content-evenly mb-3">
              <div className="col-3 mb-5">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Quesos</h5>
                    <p className="card-text">Ventas de quesos: 120 unidades</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Fiambres</h5>
                    <p className="card-text">Ventas de fiambres: 80 unidades</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Tablas</h5>
                    <p className="card-text">Ventas de tablas: 50 unidades</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="d-flex justify-content-evenly">
              <div className="col-md-5 mb-4">
                <h3 className="text-center mb-3">Ventas Totales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Ventas" stroke="#ef8354" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-5 mb-4">
                <h3 className="text-center mb-3">Productos más vendidos</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Unidades" fill="#ef8354" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
