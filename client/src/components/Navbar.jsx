import { Link } from "react-router-dom";

function Navbar({ cartCount, user, setUser }) {
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return (
        <nav className="navbar">
            <h2 className="logo">Glow & Grace</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart ({cartCount})</Link>
                {user ? (
                    <>
                        <span>Hi, {user.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
export default Navbar;