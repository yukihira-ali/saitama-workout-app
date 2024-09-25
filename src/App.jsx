import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import DateTime from "./pages/DateTime";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function Layout() {
  return (
    <>
      <Navbar bg="warning" variant="light" style={{ fontWeight: 'bold' }}>
        <Container className="bg-lightblue p-2">
          <Navbar.Brand as={Button} href="/" variant="primary">
            Workout List
          </Navbar.Brand>
          <Nav className="me-auto">
            <div style={{ margin: '0 10px' }}>
              <Nav.Link as={Button} href="/add" variant="primary">
                Add Workout
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="me-left">
            <div style={{ margin: '0 10px' }}>
              <Nav.Link as={Button} href="/logout" variant="primary">
                Logout
              </Nav.Link>
            </div>
          </Nav>
          <DateTime />
        </Container>
      </Navbar>
      <div style={{ backgroundColor: "yellow" }}>
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false); // Track login status

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Login */}
            <Route path="add" element={<AddTodo />} />
            <Route path="todo/:id" element={<EditTodo />} />
            <Route path="logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Logout */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}