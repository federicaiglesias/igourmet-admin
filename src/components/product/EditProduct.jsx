import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { slug } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${slug}`
        );
        setProductInfo(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleUpdateProduct = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/products/${slug}`,
        data: productInfo,
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
          onSubmit={handleUpdateProduct}
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
                value={productInfo.name}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, name: e.target.value })
                }
              />
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
                value={productInfo.subdescription}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    subdescription: e.target.value,
                  })
                }
              />
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
                value={productInfo.price}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, price: e.target.value })
                }
              />
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
                value={productInfo.stock}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, stock: e.target.value })
                }
              />
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
                value={productInfo.subcategory}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    subcategory: e.target.value,
                  })
                }
              />
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
                value={productInfo.description}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    description: e.target.value,
                  })
                }
              />
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
                value={productInfo.image}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, image: e.target.value })
                }
              />
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
                value={productInfo.slug}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, slug: e.target.value })
                }
              />
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
