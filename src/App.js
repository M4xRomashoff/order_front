import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes, HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Cart from "./pages/Order";
import BoardAdmin from "./pages/BoardAdmin";
import SuccessSnackbar from "./components/SuccessSnackbar";
import ErrorSnackbar from "./components/ErrorSnackbar";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import NavBarCollapsible from "./components/NavBarCollapsable";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from '../src/common/logo512.png';

const App = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);


  useEffect(() => {

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
      <HashRouter>
        <div>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#/" >
                <img src={logo}  alt="logo" style={{width:'50px', paddingRight: '10px'}}/>
               "Заявка"
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                  {((currentUser && currentUser.roles.includes("ROLE_USER")) || !currentUser) && (
                    <Nav.Link href="#/order">Отправить Заявку</Nav.Link>
                  )}

                  {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
                      <Nav.Link href="#/admin"> Проверка Заявок </Nav.Link>
                  )}

                  {currentUser ? (
                      <>
                        <Nav.Link onClick={logOut}> Выход</Nav.Link>
                      </>
                  ):(
                      <>
                        <Nav.Link href="#/login"> Вход</Nav.Link>
                        <Nav.Link href="#/register"> Регистрация</Nav.Link>
                      </>
                  )}



                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="mt-5 pt-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<BoardAdmin />} />
            </Routes>
          </div>
          <SuccessSnackbar />
          <ErrorSnackbar />
        </div>
      </HashRouter>
  );
};

export default App;
