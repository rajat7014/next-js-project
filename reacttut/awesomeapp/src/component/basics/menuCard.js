import React from "react";

const MenuCard = ({menuData}) => {
    // console.log(menuData);
    return(
        <>
        <section className="main-card--cointainer">
        {menuData.map((curElem)=>{

            const {id,name,category,image,description,price} = curElem; // this is destructuring



            return(
                // here we can replace the {curElem.id} image category
                <>
                <div className="card-container" key={id}>
        <div className="card">
        <div className="card-body">
        <span className="card-number card-circle subtle">
        {id}</span>
        <span className="card-author subtle">
        {curElem.name}</span>
        <h2 className="card-title">{name}</h2>
        <span className="card-description subtle">
        {description}
        </span>
        <span className="price-details">{price}</span>
        <div className="card-read">Read</div>
        </div>
        <img src={image} alt="images" className="card-media"/>
      
        <span className="card-tag subtle">Order Now</span>

        </div>
        </div>
                </>
            )
        })}
       </section>
        </>
    )
};

export default MenuCard;