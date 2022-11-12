import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { elementAcceptingRef } from '@mui/utils'
import {deleteToCart,addToCart,remove } from '../Redux/Actions/action'
const Cardsdetails = () => {
  const [data, setData] = useState([])
  console.log(data)
  const { id } = useParams();
  const history = useNavigate();
  const getdata = useSelector((state) => state.chartReducer.carts);
  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id
    });
    setData(compareData);
  }
  useEffect(() => {
    compare();
  }, [id])
  
  const dispatch= useDispatch();
  const send=(e)=>{
    dispatch(addToCart(e))
  }
  const dlt = (id) => {
    dispatch(deleteToCart(id));
    history("/")
  }

  const removeOne=(item)=>{
    dispatch(remove(item))  
  }
  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Items Detail Page</h2>
        <section className='container mt-3'>
        {
          getdata.length ?
          <div className="items-details d-flex">
            {
              data.map((ele) => {
                return (
                  <>
                    <div className="items-img">
                      <img src={ele.imgdata} alt=""/>
                    </div>
                    <div className="details">
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <p className='my-2'> <strong>Restaurant </strong> : {ele.rname}</p>
                              <p className='my-2'> <strong>Price </strong> : ₹ {ele.price}</p>
                              <p className='my-2'> <strong>Dishes </strong> : {ele.address}</p>
                              <p className='my-2'> <strong>Total  </strong> : ₹ {ele.price * ele.qnty} </p>

                              <div className='mt-5 d-flex justify-content-around align-items-center cur-po' style={{width:100,background:"#dddd",color:'#111'}}>
                                  <span style={{fontSize:24}} onClick={ele.qnty<=1?()=>dlt(ele) :()=>removeOne(ele)}>-</span>
                                  <span style={{fontSize:22}}>{ele.qnty}</span>
                                  <span style={{fontSize:24}}  onClick={()=>send(ele)}>+</span>
                              </div>
                            </td>
                            <td>
                              <p className='my-2'><strong>Rating : <span style={{ background: "green", color: '#fff', padding: '2px 5px', borderRadius: '5px' }}>{ele.rating} ★</span></strong></p>
                              
                              <p className='my-2'><strong>Order Review </strong>: <span>{ele.somedata}</span></p>
                              
                              <p className='my-2'><strong>Remove</strong> : <span><i className="fa-solid fa-trash cur-po" style={{ color: "red", fontSize: 20 }} onClick={()=>dlt(ele.id)}></i></span></p>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </>
                )
              })
            }
          </div>:
          <div className='empty-cart'>
              <img src="https://aleointernational.com/img/empty-cart-yellow.png" alt="" />
              <div className='mt-4'>
                <Link to='/' className='empty-cart-back-to-home text-decoration-none text-dark'>Back to Home</Link>
              </div>
          </div>
        }
          
        </section>
      </div>
    </>
  )
}

export default Cardsdetails