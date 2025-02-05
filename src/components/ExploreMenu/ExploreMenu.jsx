import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list?.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.product_category_name?"All":item.product_category_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.product_category_img} className={category===item.product_category_name?"active":""} alt="" />
                    <p>{item.product_category_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
