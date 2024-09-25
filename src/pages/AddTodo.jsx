import { useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";
import { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap"

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("authenticated");
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [navigate]);

    function addTodo(event) {
        event.preventDefault();
        setTodos([...todos, { id: Date.now(), title, description, completed }]);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form onSubmit={addTodo}>

                {/* title */}
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Get software developer job"
                        required
                    />
                </Form.Group>

                {/* description */}
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        row={3}
                        placeholder={`1. Create amazing app \n 2. Apply to Google and Netflix \n 3. Crush the interview`}
                        required
                    />
                </Form.Group>

                {/* checkbox */}
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />

                {/* button */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}