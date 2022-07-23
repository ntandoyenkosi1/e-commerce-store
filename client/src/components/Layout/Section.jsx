import { Link } from "react-router-dom"
const Section = () => {
  return (
    <div className="section">
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consectetur, nisi eu consectetur consectetur, nisi nisi euismod
        nisi, eu consectetur nisi nisi euismod nisi.
      </h2>
      <button>
        <Link to="/products">Start shopping</Link>
      </button>
    </div>
  )
}
export default Section