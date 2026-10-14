import { Link } from "react-router-dom";
import heroProducts from "../assets/hero-products.png";
function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p>NEW COLLECTION</p>

        <h1>Find Your Perfect Style</h1>

        <p>
          Discover our latest collection of quality products
          designed for everyday life.
        </p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>

      <div className="hero-image">
        <img src={heroProducts} alt="Fashion Products" />
      </div>
    </section>
  );
}

export default Hero;