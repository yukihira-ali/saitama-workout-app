import { useState, useEffect, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [alarmTime, setAlarmTime] = useState(null); // Alarm time in seconds
    const setTodos = useContext(TodoContext).setTodos;

    // Functions related to the timer
    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => {
                    if (alarmTime !== null && prevTimer >= alarmTime) {
                        clearInterval(intervalID); // stop the timer
                        alert("Alarm: Time is up!");
                        setAlarmTime(null); // reset alarm after it rings
                        return prevTimer; // prevent further updates
                    }
                    return prevTimer + 1;
                });
            }, 1000);

            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    };

    const deleteTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodos) => prevTodos.id !== todo.id)
        );
    };

    const handleAlarmChange = (event) => {
        const inputTime = parseInt(event.target.value);
        setAlarmTime(inputTime || null); // Set alarm time in seconds
    };

    useEffect(() => {
        // Cleanup intervals on unmount
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <Card border={border} className="my-3">
            <Card.Header>
                {!completed && "Not"} Completed
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {todo.title}
                </Card.Title>
                <Card.Text>
                    {todo.description}
                </Card.Text>
                <p>Timer: {timer} seconds</p>
                <Button onClick={startTimer} className="ms-2">
                    <i className="bi bi-play"></i>
                </Button>
                <Button onClick={pauseTimer} className="ms-2">
                    <i className="bi bi-pause-fill"></i>
                </Button>
                <Button onClick={resetTimer} className="ms-2">
                    <i className="bi bi-arrow-clockwise"></i>
                </Button>
                <Form.Control
                    type="number"
                    placeholder="Set alarm time (seconds)"
                    className="mt-2"
                    onChange={handleAlarmChange}
                    value={alarmTime || ''}
                />
                <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
                    <i className="bi bi-pencil"></i>
                </Button>
                <Button onClick={deleteTodo} className="ms-2" variant="danger">
                    <i className="bi bi-trash3"></i>
                </Button>
            </Card.Body>
        </Card>
    );
}
