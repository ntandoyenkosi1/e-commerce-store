import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
const Cart = (props) => {
  //const { cart, setCart } = useContext(CartContext);
  //const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log(props)
    var products = JSON.parse(localStorage.getItem("cart"))
    props.setCart(products)
  }, []);
  function handleRemove(item) {
    var products = JSON.parse(localStorage.getItem("cart"))
    products = products.filter(c => c.product._id != item.product._id)
    localStorage.setItem("cart", JSON.stringify(products))
    props.setCart(products)
  }
  function incrementCart(item) {
    var products = JSON.parse(localStorage.getItem("cart"))
    products = products.map((c) => {
      if (c.product._id == item.product._id) {
        c.quantity = c.quantity + 1
        return c
      }
      return c
    })
    localStorage.setItem("cart", JSON.stringify(products))
    props.setCart(products)
  }
  function decrementCart(item) {
    var products = JSON.parse(localStorage.getItem("cart"))
    products = products.map((c) => {
      if (c.product._id == item.product._id && c.quantity > 1) {
        c.quantity = c.quantity - 1
        return c
      }
      return c
    })
    localStorage.setItem("cart", JSON.stringify(products))
    props.setCart(products)
  }
  return (
    <div>
      <div>
        <WysiwygIcon color='secondary' fontSize='large' />
      </div>
      {props && props.data && (
        props.data.map((item, index) => {
          return (
            <div key={index} >
              <span>{index + 1}.</span>
              <img src={item.product.image} width={50} height={50} />{"  "}
              <span>{item.product.name}</span>{"  "}
              <span >
                R{item.product.price}
              </span>
              <div>
                <button onClick={() => handleRemove(item)} title="Remove from Cart">X</button>
                <button onClick={() => decrementCart(item)}>-</button>
                <span>: {item.quantity}</span>
                <button onClick={() => incrementCart(item)}>+</button>
              </div >
            </div>
          )
        })
      )}
    </div>
  );
};
export default Cart;
