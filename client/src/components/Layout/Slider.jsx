import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ProductContext from "../../context/ProductContext";
import Loading from "./Loading";
const Slider = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("/api/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          return setProducts(result.data);
        }
        navigate("/internal-error");
      })
      .catch((error) => {
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
    var cart = localStorage.getItem("cart");
    if (!cart)
      return localStorage.setItem(
        "cart",
        JSON.stringify([{ product: item, quantity: 1 }])
      );
    if (cart?.includes(JSON.stringify(item))) {
      cart = JSON.parse(cart).map((c) => {
        if (c.product._id == item._id) {
          c.quantity = c.quantity + 1;
          return c;
        }
        return c;
      });
      return localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart = JSON.parse(cart);
      cart.push({ product: item, quantity: 1 });
      return localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  return (
    <div className="center">
      {products.length == 0 && <Loading />}
      <span className="container-slider">
        <div className="container-products">
          {products.map((item, key) => {
            return (
              <div
                className="card"
                key={key}
                style={{ backgroundColor: "white" }}
              >
                <img src={item.image} width="200" height="200" alt="" />
                <div
                  className="card-item"
                  style={{
                    backgroundColor: "white",
                    position: "relative",
                  }}
                >
                  {item.name}
                </div>
                <div className="card-item">R {item.price} </div>
                {/* <Link to={`/products/checkout/${item._id}`}>Buy</Link>{" "} */}
                <div className="card-item">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(item)}
                  >
                    <AddShoppingCartRoundedIcon />
                    Add To Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </span>
    </div>
  );
};
export default Slider;
