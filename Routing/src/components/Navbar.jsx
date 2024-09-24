import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </>
  )
}

export default Navbar
