/* esLint-disable */

import { useState } from 'react';
import './App.css';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './routes/Main';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Ranking from './routes/Ranking';
import CharacterInfo from './routes/character/Info'

function App() {
  let navigate = useNavigate();

  let [name, setName] = useState('');

  let changeName = (e: any) => {
    setName(e.target.value);
  }

  let searchCharacter = () => {
    navigate('/character/' + name);
  }

  let handleKeyDown = (e: any) => {
    if(e.key === 'Enter') {
      searchCharacter();
    }
  }

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">LostArk API</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/ranking') }}>Ranking</Nav.Link>
            </Nav>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="캐릭터 검색"
              className="me-2"
              aria-label="Search"
              value={name}
              onChange={changeName}
              onKeyDown={handleKeyDown} 
            />
            <Button variant="outline-success" size="sm" onClick={() => { searchCharacter() }}>Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <Main></Main> }></Route>
        <Route path="/ranking" element={<Ranking></Ranking>}></Route>
        <Route path="/character/:name" element={<CharacterInfo></CharacterInfo>}></Route>
      </Routes>
    </div>
  );
}

export default App;
