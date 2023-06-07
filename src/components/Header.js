import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { useNavigate, NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import {DLT} from '../redux/actions/action';

function Header() {

    const getState = useSelector((state) => state.cartReducer.carts)

    const [price,setPrice] = useState()
    // console.log("getState", getState)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const history = useNavigate();

    const dlt = (id) =>{
        dispatch(DLT(id))
        // console.log(id)
        history('/')
    }

    const total = ()=>{
        let price = 0;
        getState.map( (el)=>{
            const num = el.qnty

            return price+=num*el.price
        })
        setPrice(price);
        // console.log(price)
    }

    useEffect(()=>{
        total();
    },[total])

    return (
        <Navbar bg="dark" variant="dark" style={{ height: '60px' }}>
            <Container>
                <Navbar.Brand>Cart App</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
                </Nav>

                <Badge badgeContent={getState.length} color="primary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <i className="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
                </Badge>

            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                
                {
                    getState.length ?
                    
                        <div>
                            <i onClick={handleClose} className='fas fa-close smallclose' style={{ position: 'absolute', top: 2, right: 10, fontSize: 23, cursor: 'pointer' }} ></i>
                            <div className='card_details' style={{ width: '24rem', padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getState.map((e,key) => {
                                                return (
                                                    <>
                                                        <tr key={key}>
                                                            <td>
                                                                <NavLink to = {`/cart/${e.id}`}><img onClick={handleClose} src={e.imgdata} alt='' style={{ width: '5rem', height: '5rem' }} /></NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹ {e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p onClick= {()=>dlt(e.id)}  style={{ color: 'red', fontSize: '20', cursor: 'pointer' }}>
                                                                    <i className='fas fa-trash smalltrash'></i>
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p onClick= {()=>dlt(e.id)} style={{ color: 'red', fontSize: '20', cursor: 'pointer' }}>
                                                                    <i className='fas fa-trash largetrash'></i>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td>
                                                <p className='text-center'>Total : ₹ {price}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        :
                        <div className='cards_details d-flex just-content-center align-items-center' style={{ minWidth: '180px', padding: 10 }}>
                            <i onClick={handleClose} className='fas fa-close smallclose' style={{ position: 'absolute', top: 2, right: 10, fontSize: 23, cursor: 'pointer' }} ></i>
                            <p style={{ fontSize: 22, marginTop: 20 }}>You Cart is empty!</p>
                        </div>
                }
            </Menu>
        </Navbar>
    )
}

export default Header