import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Loading from "../Layout/Loading";
import { useContext } from "react";
import OrderContext from "../../context/OrderContext";
const Orders = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const [role, setRole] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(orders);
    var myHeaders = new Headers();
    var token = localStorage.getItem("token");
    myHeaders.append("x-auth-token", token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`/api/sales/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          return setOrders(result.data);
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
  function handleRemove(id) {
    var myHeaders = new Headers();
    var token = localStorage.getItem("token");
    myHeaders.append("x-auth-token", token);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/sales/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          return alert("Sale removed successfully");
        }
        navigate("/internal-error");
      })
      .catch((error) => {
        navigate("/internal-error");
      });
  }
  return (
    <div className="center">
      <h1>Orders</h1>
      <h4>View Orders</h4>
      {orders.length == 0 && <Loading />}
      {orders.map((item, key) => {
        return (
          <div key={key}>
            <span>
              {item.date.slice(0, 10)}|{"  "}
              {item.product.length} items {} ordered
              <Link to={`/order/${item._id}`}>
                <VisibilityOutlinedIcon />
                View
              </Link>
              {role && role.roles && role.roles.includes("admin") && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(item._id)}
                >
                  <DeleteOutlinedIcon />
                  Remove
                </Button>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Orders;
