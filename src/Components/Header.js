import React, { useEffect } from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import './style.css'
// import MenuItem from '@mui/material/MenuItem';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteToCart } from '../Redux/Actions/action';

const Header = () => {
    const [price, setPrice] = useState(0);
    console.log(price)

    const [quantity, setQuantity] = useState(0);
    console.log(quantity)


    // get data from store 
    const getdata = useSelector((state) => state.chartReducer.carts);
    console.log(getdata);

    // dispatch function
    const dispatch = useDispatch();
    //cart menu code start
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //cart menu code end
    const dlt = (id) => {
        dispatch(deleteToCart(id));
    }

    const total = (()=>{
        let price = 0;
        getdata.map((ele,k)=>{
          price = (ele.price)*(ele.qnty) + price;
        });
        setPrice(price);
      });
    useEffect(() => {
      total();
    }, [total])
      
    const totalQnty= (()=>{
        let quantity =0;
        getdata.map((ele,k)=>{
            quantity = ele.qnty + quantity;
        });
        setQuantity(quantity)
    });
    useEffect(() => {
        totalQnty();
      }, [totalQnty])
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to='/' className='text-decoration-none text-white px-2 nav-brand'>Food ka Fanda</Link>
                    <Nav className="me-auto">
                        <Link to="/" className='text-decoration-none text-white px-2'>Home</Link>
                        {/* <Link to="/cart" className='text-decoration-none text-white px-2'>Add to Cart</Link> */}
                    </Nav>
                    <Badge badgeContent={getdata.length} color="primary"
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <i className="fa-solid fa-cart-shopping text-light shopping-cart-icon cur-po"></i>
                    </Badge>
                </Container>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    {
                        // here use ternary operator if getdata.length is >0 than display this part else display : part(the cart is empty)
                        getdata.length ?
                            <div className='card-details'>
                                <table className='added-cart-sec-table'>
                                    <thead>
                                        <tr className='added-cart-sec-thead-tr'>
                                            <th>Photo</th>
                                            <th>Restaurants</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e) => {
                                                return (
                                                    <>
                                                        <tr key={e.id} className='add-cart-sec-tbody-tr'>
                                                            <td>
                                                                <Link to={`/cart/${e.id}`} onClick={handleClose}><img src={e.imgdata} alt="" className='add-to-cart-sec-img' /></Link>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹ {e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p style={{ color: 'red', fontSize: 20 }} className='smalltrash'>
                                                                    <i className="fa-solid fa-trash cur-po" onClick={() => dlt(e.id)}></i>
                                                                </p>
                                                            </td>
                                                            <td className='mt-4 add-cart-tbody-trash'>
                                                                <i className="fa-solid fa-trash cur-po largetrash" style={{ color: 'red', fontSize: 20 }} onClick={() => dlt(e.id)}></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <hr className='header-add-to-cart-hr'/>
                                        <p className="text-left header-cart-grand-total">Total : ₹{price}</p>
                                        <p className="text-left header-cart-grand-total">Total Quantity : ₹ {quantity}</p>
                                    </tbody>
                                </table>
                            </div> :
                            <div className='card-details'>
                                <i className="fa-solid fa-xmark cur-po"
                                    onClick={handleClose}
                                ></i>
                                <div className='header-menu-wrapper'>
                                    <p>Your Cart is Empty</p>
                                    <img className='gifcart' src="https://parcamkapinda.com/img/cart.gif" alt="cart gif" />
                                </div>
                            </div>
                    }
                </Menu>
            </Navbar>
        </>
    )
}
export default Header