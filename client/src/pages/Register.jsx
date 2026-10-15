import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSuccess(false);

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            setMessage("Please fill in all fields");
            return;
        }
        if (!email.includes("@")) {
            setMessage("Please enter a valid email");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const response = await fetch("https://glow-and-grace-c15y.onrender.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage(data.message);
            setIsSuccess(true);
        } else {
            setMessage(data.error);
            setIsSuccess(false);
        }
    };

    return (
        <main className="register-page">
            <div className="register-card">
                <h1>Create an Account</h1>
                <p>Join Glow & Grace and start shopping</p>
                <form onSubmit={handleSubmit} noValidate>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}

                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    {message && (
                        <p className={isSuccess ? "success-message" : "login-message"}>
                            {message}
                        </p>
                    )}
                    <button type="submit">
                        Create Account
                    </button>
                </form>



            </div>
        </main>
    );
}

export default Register;