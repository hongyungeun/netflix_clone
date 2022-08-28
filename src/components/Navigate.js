import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useNavigate} from 'react-router-dom'

function Navigate() {
  
  const navigate = useNavigate()
  const [query,setQuery] = useState('')
  const searchQuery = ()=>{
    navigate(`/searchPage?q=${query}`)
  }
  const serachOnChange =(e)=>{
    setQuery(e.target.value)
    
  }
  const keyDown = (e)=>{
    if(e.key === 'Enter'){
      searchQuery()
    }
  }
  return (
    <div className='navbar_wrap'>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img width={100} src='https://imgix.bustle.com/uploads/image/2017/8/29/c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to='/' className='nav_item'>Home</Link>
              <Link to='/movies?page=1' className='nav_item'>Movies</Link>
            </Nav>
            
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={serachOnChange}
                onKeyDown={keyDown}
              />
              
              <Button onClick={searchQuery} variant="outline-danger">Search</Button>
              
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigate