import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const authStatus = localStorage.getItem("authenticated") === "true";
        setIsAuthenticated(authStatus);
        if (authStatus) {
            window.location.href = "/"; // Redirect to home if already authenticated
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple authentication logic (this can be replaced with real authentication)
        if (email === "user@example.com" && password === "password") {
            localStorage.setItem("authenticated", "true");
            window.location.href = "/"; // Redirect to home page after login
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <Container className="mt-5">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isAuthenticated && (
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Insert this (user@example.com)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Insert this (password)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Login
                    </Button>
                </Form>
            )}
        </Container>
    );
}