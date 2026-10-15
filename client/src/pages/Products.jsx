import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";

import pinkHandbag from "../assets/pink-handbag.png"
import classicSneakers from "../assets/classic-sneakers.png"
import sunglasses from "../assets/sunglasses.png"
import goldWatch from "../assets/gold-watch.png"
import classicHeels from '../assets/classic-heels.png'
import runningShoes from "../assets/running-shoes.png"
import casualLoafers from "../assets/casual-loafers.png"
import goldNecklace from "../assets/gold-necklace.png"
import silkScarf from "../assets/silk-scarf.png"
import floralPerfume from "../assets/floral-perfume.png"
import crossbodyBag from "../assets/crossbody-bag.png"
import matteLipstick from "../assets/matte-lipstick.png"
import miniBackpack from "../assets/mini-backpack.png"
import faceCream from "../assets/face-cream.png"
import makeupSet from "../assets/makeup-set.png"
import toteBag from "../assets/tote-bag.png"

const productImages = {
    1: pinkHandbag,
    2: classicSneakers,
    3: sunglasses,
    4: goldWatch,
    5: classicHeels,
    6: runningShoes,
    7: casualLoafers,
    8: goldNecklace,
    9: silkScarf,
    10: floralPerfume,
    11: crossbodyBag,
    12: matteLipstick,
    13: miniBackpack,
    14: faceCream,
    15: makeupSet,
    16: toteBag,
};

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        fetch("https://glow-and-grace-c15y.onrender.com/api/products")
            .then((response) => response.json())
            .then((data) => {
                const productsWithImages = data.map((product) => ({
                    ...product,
                    image: productImages[product.id],
                }));

                setProducts(productsWithImages);
            });
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });
    if (sortOrder === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    return (
        <main className="products-page">
            <h1>Products</h1>
            <p>Explore our latest products.</p>

            <input
                className="product-search"
                type="text"
                placeholder="search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select
                className="sort-select"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
            >
                <option value="default">Sort by price</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>


            <div className="category-buttons">
                <button onClick={() => setSelectedCategory("All")}>All</button>
                <button onClick={() => setSelectedCategory("Bags")}>Bags</button>
                <button onClick={() => setSelectedCategory("Shoes")}>Shoes</button>
                <button onClick={() => setSelectedCategory("Accessories")}>
                    Accessories
                </button>
                <button onClick={() => setSelectedCategory("Beauty")}>Beauty</button>
            </div>

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </main>
    );
}

export default Products;