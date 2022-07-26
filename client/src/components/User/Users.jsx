import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    var myHeaders = new Headers();
myHeaders.append("x-auth-token", localStorage.getItem("token"));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3001/api/users/", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.ok) {
      setUsers(result.data);
    }
  })
  .catch(error => console.log('error', error));
  })
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user._id}>
          <span>{user.name}</span>{"  |  "}
          <span>{user.email}</span>{"  |  "}
          {user.roles && user.roles.includes("client") && <button>Make Admin</button>}
          <button>Remove user</button>
        </div>
      ))}
      </div>
  )
}
export default Users;