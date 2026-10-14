import { useState } from "react";
function Checkout({ cart, user, setCart }) {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [message, setMessage] = useState("");


    const total = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setMessage("Please log in before placing an order");
            return;
        }
        if (
            fullName === "" ||
            address === "" ||
            city === "" ||
            zipCode === ""
        ) {
            setMessage("Please fill in all shipping information");
            return;
        }

        const response = await fetch("http://localhost:5001/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.id,
                fullName: fullName,
                address: address,
                city: city,
                zipCode: zipCode,
                total: total,
                items: cart,
            }),
        });
        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            setCart([]);
        } else {
            setMessage(data.error);
        }


    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <h2>Order Summary</h2>

            {cart.map((product) => (
                <div key={product.id}>
                    <p>
                        {product.name} × {product.quantity} — $
                        {(product.price * product.quantity).toFixed(2)}
                    </p>
                </div>
            ))}

            <h3>Order Total: ${total.toFixed(2)}</h3>

            <h2>Shipping Information</h2>


            <form className="checkout-form" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                />

                <label>Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your address"
                />

                <label>City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter your city"
                />

                <label>ZIP Code</label>
                <input
                    type="text"
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value)}
                    placeholder="Enter your ZIP code"
                />

                <button type="submit" className="place-order-btn">
                    Place Order
                </button>
                {message && <p className="checkout-message">{message}</p>}
            </form>
        </div>


    );
}

export default Checkout;