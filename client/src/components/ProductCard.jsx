function ProductCard(props) {
    return (
        <div className="product-card">
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
            <p>${props.price}</p>
            <p>{props.category}</p>

            <button onClick={() => props.addToCart(props.product)}>Add to Cart</button>
        </div>
    );
}
export default ProductCard;