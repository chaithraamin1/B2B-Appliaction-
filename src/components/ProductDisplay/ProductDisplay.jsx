import React, { useContext } from 'react'
import './ProductDisplay.css'
import ProductItem from '../ProductItem/ProductItem'
import { StoreContext } from '../../Context/StoreContext'

const ProductDisplay = ({category}) => {

  const {product_list} = useContext(StoreContext);

  return (
    <div className='product-display' id='product-display'>
      <h2>Top dishes near you</h2>
      <div className='product-display-list'>
        {product_list?.map((item)=>{
          if (category==="All" || category===item.product_category) {
            return <ProductItem key={item.id} image={item.product_image} name={item.product_name} desc={item.product_description} price={item.price} id={item.id}/>
          }
        })}
      </div>
    </div>
  )
}

export default ProductDisplay
