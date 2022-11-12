import React from 'react'
import Header from './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from "react-router-dom";
import Cards from './Components/Cards';
import Cardsdetails from './Components/Cardsdetails';
const App = () => {
  return (
      <>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Cards/>}/>
          <Route exact path='/cart/:id' element={<Cardsdetails/>}/>
          <Route exact path='/cart/' element={<Cardsdetails/>}/>
        </Routes>
      </>
    )
}
export default App