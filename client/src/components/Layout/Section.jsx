import { Link } from "react-router-dom"
const Section = () => {
  return (
    <div className="section">
      <button>
        <Link to="/products">Start shopping</Link>
      </button>
    </div>
  )
}
export default Section