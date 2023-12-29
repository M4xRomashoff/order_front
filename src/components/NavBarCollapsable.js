import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useSelector} from "react-redux";

function NavBarCollapsible({currentUser, logOut, level, score}) {



    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"> Do You Speak English ?</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#/">Главная Страница</Nav.Link>
                        <Nav.Link href="#/lessons">Уроки</Nav.Link>
                        <Nav.Link href="#/tests">Тесты</Nav.Link>
                        <Nav.Link href="#/games">Игры</Nav.Link>
                        <Nav.Link href="#/edit"> Редактор</Nav.Link>
        {currentUser ? (
                        <>
                        <span className="p-2 bg-secondary">Уровень: {level}</span>
                        <span className="p-2 bg-warning">Баллы: {score}</span>
                        <Nav.Link href="#/login" onClick={logOut}> Выход</Nav.Link>
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
    );
}

export default NavBarCollapsible;

