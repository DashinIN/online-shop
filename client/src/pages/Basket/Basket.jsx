import React, { useEffect, useContext } from 'react';
import { Context } from '../../index';
import { getBasket } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts"
import BasketItem from "../../components/BasketItem/BasketItem"
import s from "./Basket.module.scss"


const Basket = observer(() => {
    const {device} = useContext(Context)

    

    useEffect(() => {
        getBasket().then(data => device.setBasket(data))
      
    }, [])

    

    let prices = 0;
    device.basket.map(price =>
        prices += Number(price.device.price)
    )

    if(!device.basket.length) {
        return(
       <div className={s.basket__wrapper}>
            <h2 className={s.basket__title}>В корзине пока пусто</h2>
            <p className={s.basket__text}>Загляните на главную, чтобы выбрать товары</p>
            <Link className={s.basket__button} to={SHOP_ROUTE}>Перейти на главную</Link>
       </div>
        )
    }

    return (
     <div className={s.basket__wrapper}>
            <h1>Корзина</h1>
            <h2>Итого:</h2>
            <h3>{prices}<span >рублей</span></h3>
            {device.basket.map(item =>
                <BasketItem 
                item={item}
                img={item.device.img}
                name={item.device.name}
                id={item.id}
                price={item.device.price}
                />
                
            )}
     </div>
    );
});

export default Basket;