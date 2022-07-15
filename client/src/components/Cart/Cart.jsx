import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/api/carts", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.ok) {
          setCart(result.data);
          console.log(result.data)
        }
      })
      .catch(error => console.log('error', error));
  },[])
  function handleRemove(id) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3001/api/carts/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        if (result.ok) {
          setCart(cart.filter(item => item._id !== id));
        }
       })
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <h1>Cart</h1>
      {cart && cart.map((item, key) => {
        console.log(item)
        return (
          <div key={key}>
            <span>
              {item.product[0] && (
              <>
                  {item.product[0].name} | {item.product[0].description} | R{item.product[0].price}{" "}
                  <button onClick={()=>handleRemove(item._id)}>Remove</button>
                  </>
              )}
              
            </span>
          </div>
        )
      }
      )}
      <Link to={`/cart/checkout`}>Checkout</Link>
    </div>
  )
}
export default Cart