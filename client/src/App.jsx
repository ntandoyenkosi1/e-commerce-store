import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./components/Layout/Home";
import Products from "./components/Products/Products";
import Product from "./components/Products/Product";
import EditProduct from "./components/Products/EditProduct";
import DeleteProduct from "./components/Products/DeleteProduct";
import CreateProduct from "./components/Products/CreateProduct";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import Categories from "./components/Category/Categories";
import Category from "./components/Category/Category";
import CreateCategory from "./components/Category/CreateCategory";
import DeleteCategory from "./components/Category/DeleteCategory";
import EditCategory from "./components/Category/EditCategory";
import Orders from "./components/Orders/Orders";
import Order from "./components/Orders/Order";
import Profile from "./components/User/Profile";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Checkout from "./components/Cart/Checkout";
import NotFound from "./components/Error/NotFound";
import ErrorOccured from "./components/Error/ErrorOccured";
import Loading from "./components/Layout/Loading";
import UserContext from "./context/UserContext";
import Footer from "./components/Layout/Footer";
function App() {
	const [user, setUser] = React.useState(null);
  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);
	return (
		<BrowserRouter>
			<Header />
			<UserContext.Provider value={value}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:id' element={<Product />} />
				<Route path='/products/edit/:id' element={<EditProduct />} />
				<Route
					path='/products/delete/:id'
					element={<DeleteProduct />}
				/>
				<Route path='/products/create' element={<CreateProduct />} />
				<Route path='/category' element={<Categories />} />
				<Route path='/category/:id' element={<Category />} />
				<Route path='/category/create' element={<CreateCategory />} />
				<Route
					path='/category/delete/:id'
					element={<DeleteCategory />}
				/>
				<Route path='/category/edit/:id' element={<EditCategory />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/orders/:id' element={<Order />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/cart/checkout' element={<Checkout />} />
				<Route path="/test" element={<Loading/>}/>
				<Route path='/internal-error' element={<ErrorOccured />} />
				<Route path='/error' element={<NotFound />} />
					<Route path='/*' element={<NotFound />} />
				</Routes>
				<Footer/>
				</UserContext.Provider>
		</BrowserRouter>
	);
}
export default App;
