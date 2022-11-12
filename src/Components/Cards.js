import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import Cardsdata from './CardsData';
import './style.css'
import { addToCart } from '../Redux/Actions/action';

const Cards = () => {
  const [data, setData] = useState(Cardsdata)
  // console.log(data)
  const dispatch = useDispatch();
  const send=(e)=>{
    dispatch(addToCart(e))
  }
  return (
    <>
      <div className="container mt-3">
        <h2 className='text-center'>Food ka Fanda</h2>
        <div className="row d-flex justify-content-center align-items-center">
          {
            data.map((element,id) => {
              return (
                <>
                  <Card key={element.id} style={{ width: '22rem',border:"none" }} className='mx-2 mt-4 card-style'>
                    <Card.Img variant="top" src={element.imgdata} className='card-img mt-3'/>
                    <Card.Body>
                      <Card.Title>{element.rname}</Card.Title>
                      <Card.Text>
                        Price : ₹{element.price}
                      </Card.Text>
                      <Button variant="primary"
                      onClick={()=>send(element)}
                      >Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Cards