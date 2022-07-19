import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__home">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            <li className="navbar__item navbar__locations">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item navbar__products">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>
            <li className="navbar__item navbar__employees">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item navbar__customers">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
        </ul>
    )
}

