import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addiIem } from '../../redux/slice'
import { useNavigate } from "react-router-dom";
import Alert from '../../utiles/alert/Alert';
import './products.css'

function Products({ setTotalPages, page }) {
    const [products, setProduct] = useState([])
    const [response, setresponse] = useState({ type: "", message: "", isExist: false, action: null })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)

    const handleAddItem = useCallback(
        (item) => () => {
            if (isAuth) dispatch(addiIem(item))
            else navigate("/signin")
        }
        , [dispatch, isAuth, navigate])

    useEffect(() => {
        try {
            const products = async () => {
                const data = await fetch(`https://store-imade.herokuapp.com/products/${page}/`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                const { product, pages } = await data.json()
                setProduct(product)
                setTotalPages(pages)
            }
            products()
        } catch (err) {
            setresponse({ type: "error", message: "failed to load data , please  try again!!", isExist: true })
        }
        window.scrollTo(0, 0)
    }, [page, setTotalPages])

    return (
        <div className='adjust-container'>
            <div className='con'>
                {
                    products.map((el, index) => (
                        <div className="card" key={index}>
                            <div className='card_image' style={{
                                backgroundImage: `url(${el.image})`
                            }}>
                            </div>
                            <div className='details'>
                                <div className='title gradient__text '>{el.name}</div>
                                <div className='description'>{el.description.substring(0, 320)}</div>
                                <div className='reflexionSection'>
                                    <div className='button' onClick={handleAddItem(el)}>ADD TO CART</div>
                                    <div className='homeprice'><p> {el.price} $ </p></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {response.isExist && <Alert setresponse={setresponse} response={response} />}
            </div>

        </div>
    )
}

export default Products