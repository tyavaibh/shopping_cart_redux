import React, { useState, useEffect } from 'react'
import './Style.css'
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../redux/actions/action';
import ADD from '../redux/actions/action';
import {REMOVE} from '../redux/actions/action';


const CardDetails = () => {

  const [data, setData] = useState([])
  // console.log("data", data)

  const { id } = useParams();
  // console.log(id)

  const getState = useSelector((state) => state.cartReducer.carts)

  const compare = () => {
    let comparedata = getState.filter((e) => (e.id ==id))
    // console.log("comparedata", comparedata);
    setData(comparedata)
  }

  useEffect(() => {
    compare()
  }, [id])

  const dispatch = useDispatch();
  const history = useNavigate();

  const dlt = (id) => {
    dispatch(DLT(id))
    // console.log(id)
    history('/')
  }

  const rmv = (e) => {
    dispatch(REMOVE(e))
    // console.log(id)
    // history('/')
  }

  const send = (e)=>{
    dispatch(ADD(e))
  }

  return (
    <>
      <div className='container-mt-2'>
        <h2 className='text-center'>Items Detail Page</h2>

        <section className='container mt-3'>
          <div className='itemsdetails'>
            {data.map((ele) => {
              return (
                <>
                  <div className='items_img'>
                    <img src={ele.imgdata} />
                  </div>

                  <div className='details'>
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <p><strong>Restaurant</strong> : {ele.rname}</p>
                            <p><strong>Price</strong> : ₹ {ele.price}</p>
                            <p><strong>Dishes</strong> : {ele.address}</p>
                            <p><strong>Total</strong> : ₹ {ele.price * ele.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100, cursor : 'pointer', background : '#ddd', color : '#111', padding:'10px'}}>
                              <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>rmv(ele) }>-</span>
                              <span style={{fontSize:24}}>{ele.qnty}</span>
                              <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>
                            </div>
                          </td>

                          <td>
                            <p><strong>Rating</strong> : <span style={{ background: 'green', color: 'white', padding: '2px 5px', borderRadius: '5px' }} >{ele.rating} ★</span></p>
                            <p><strong>Order Review</strong> : <span style={{}} >{ele.address}</span></p>
                            <p onClick={() => dlt(ele.id)} ><strong>Remove</strong> <span style={{}} >: <i className='fas fa-trash' style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }}></i></span></p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </>
              )
            })}
          </div>
        </section>
      </div>

    </>
  )
}

export default CardDetails