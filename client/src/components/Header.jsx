import { Link } from "react-router-dom"
const Header = () => {
  return <>
    <Link to="/login">Login</Link>
    <Link to='/sign-up'>Sign up</Link>
  </>
}
export default Header