import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/Home'
import Products from './components/Products/Products'
import Product from './components/Products/Product'
import EditProduct from "./components/Products/EditProduct"
import DeleteProduct from "./components/Products/DeleteProduct"
import CreateProduct from "./components/Products/CreateProduct"
import SignUp from './components/SignUp'
import Login from './components/Login'
import Categories from "./components/Category/Categories"
import Category from "./components/Category/Category"
import CreateCategory from "./components/Category/CreateCategory"
import DeleteCategory from "./components/Category/DeleteCategory"
import EditCategory from "./components/Category/EditCategory"
import Orders from "./components/Orders/Orders"
import Profile from "./components/User/Profile"
import './styles.css'
import Header from "./components/Header"
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/products/edit/:id' element={<EditProduct />} />
        <Route path='/products/delete/:id' element={<DeleteProduct />} />
        <Route path='/products/create' element={<CreateProduct />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/category/:id' element={<Category />} />
        <Route path='/category/create' element={<CreateCategory />} />
        <Route path='/category/delete/:id' element={<DeleteCategory />} />
        <Route path='/category/edit/:id' element={<EditCategory />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
