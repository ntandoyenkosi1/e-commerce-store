import { useEffect } from "react";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
const Cart = ({ getTotal, data, setCart }) => {
    useEffect(() => {
        var products = JSON.parse(localStorage.getItem("cart"))
        setCart(products)
    }, []);
    function handleRemove(item) {
        var products = JSON.parse(localStorage.getItem("cart"))
        products = products.filter(c => c.product._id != item.product._id)
        localStorage.setItem("cart", JSON.stringify(products))
        setCart(products)
        getTotal()
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
        setCart(products)
        getTotal()
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
        setCart(products)
        getTotal()
    }
    return (
        <div>
            <div>
                <WysiwygIcon color='secondary' fontSize='large' />
            </div>
            {data && (
                data.map((item, index) => {
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