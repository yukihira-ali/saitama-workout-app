import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const todos = useContext(TodoContext).todos;

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = localStorage.getItem("authenticated");
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [navigate]);

    return (
        <Container>
            <h1 className="my-3">The One Punch Man Workout</h1>
            <h6>Rules to accept before starting this challenge!</h6>
            <p>Complete 4 mandatory workouts daily. This challenge will not be completed before your head turns bald</p>
            <Row>
                <CardGroup todos={todos} />
            </Row>
        </Container>
    );
}

function CardGroup({ todos }) {
    return todos.map((todo) => {
        return (
            <Col md={4} key={todo.id}>
                <TodoCard todo={todo} />
            </Col>
        );
    });
}