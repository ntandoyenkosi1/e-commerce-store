import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../../context/ProductContext";
import Loading from "../Layout/Loading";
const Products = ({ setCart }) => {
  const { products, setProducts } = useContext(ProductContext);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [])
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          return setProducts(result.data);
        }
        navigate("/internal-error");
      })
      .catch((error) => {
        console.log("An error occurred", error)
        navigate("/internal-error");
      });
  }, []);
  useEffect(() => {
    var r = localStorage.getItem("data");
    if (r) {
      setRole(JSON.parse(r));
    }
  }, []);
  function handleAddToCart(item) {
    var cartItems = localStorage.getItem("cart");
    if (!cartItems) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ product: item, quantity: 1 }])
      );
      var products = JSON.parse(localStorage.getItem("cart"));
      setCart(products);
      return
    }
    if (cartItems?.includes(JSON.stringify(item))) {
      cartItems = JSON.parse(cartItems).map((c) => {
        if (c.product._id == item._id) {
          c.quantity = c.quantity + 1;
          return c;
        }
        return c;
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      var products = JSON.parse(localStorage.getItem("cart"));
      setCart(products);
      return
    } else {
      cartItems = JSON.parse(cartItems);
      cartItems.push({ product: item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      var products = JSON.parse(localStorage.getItem("cart"));
      setCart(products);
      return
    }
  }
  return (
    <div className="center">
      <h1>Products</h1>
      {role && role.roles && role.roles.includes("admin") && (
        <div>
          <Link to={`/products/create`}>Add a new product</Link>
        </div>
      )}
      {products.length == 0 && <Loading />}
      <div className="container">
        {products.map((item, key) => {
          return (
            <div
              className="card"
              key={key}
              style={{ backgroundColor: "white", cursor: "pointer" }}
            >
              <img
                src={item.image}
                width="200"
                height="200"
                alt=""
                onClick={() => navigate(`/products/${item._id}`)}
              />
              <div
                className="card-item"
                onClick={() => navigate(`/products/${item._id}`)}
                style={{
                  backgroundColor: "white",
                  position: "relative",
                }}
              >
                {item.name}
              </div>
              <div className="card-item">R {item.price} </div>
              <div className="card-item">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => handleAddToCart(item)}
                >
                  <AddShoppingCartRoundedIcon />
                  Add To Cart
                </Button>
              </div>
              {role && role.roles && role.roles.includes("admin") && (
                <div className="center">
                  <Link to={`/products/edit/${item._id}`}>
                    <EditOutlinedIcon />
                    Edit
                  </Link>
                  <Link to={`/products/delete/${item._id}`}>
                    <DeleteOutlinedIcon />
                    Delete
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
