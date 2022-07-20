import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import React from 'react';
import Badge from '@mui/material/Badge';
import CartModal from "./Cart/CartModal";
const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/products'>Shop</Link>
      <Link to='/orders'>Orders</Link>
      <Link to='/category'>Categories</Link>
      <Link to='/login'>Login</Link>
      <Link to='/sign-up'>Sign up</Link>
      <Link to='/profile'>Profile</Link>
      <input type="text" placeholder="Search..." />
      <Link to='/cart'>Cart</Link>
      <span onClick={() => handleOpen()}>
        <Badge color="primary" variant="dot">
          <LocalMallOutlinedIcon color="red" />
        </Badge>
      </span>
      <CartModal open={open} handleClose={handleClose} />
    </>
  );
};
export default Header;