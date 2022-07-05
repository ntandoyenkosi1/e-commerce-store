import { Link } from "react-router-dom"
import "../styles.css"
const Home = () => {
  return <>
    
    <h1>
      Home
    </h1>
    
    <div className="text-3xl font-bold underline">
      This is home
    </div>
    <div>
    <Link to="/products">Products</Link>
    </div>
  </>
}
export default Home