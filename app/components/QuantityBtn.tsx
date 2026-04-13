"use client";
import {useState} from 'react';
import './main.css';

export default function QuantityBtn(){
    const [quantity, setQuantity] = useState(1);
    function increment(){
        setQuantity(prev => prev + 1);
    }
    function decrement(){
        setQuantity(prev => prev - 1);
    }
    return(
        <div className="quantity-btn">
            <button className="plus" onClick={quantity>1 ? decrement : undefined}>-</button>
               <span className="span">{quantity}</span>
            <button className="minus" onClick={quantity<20 ? increment : undefined}>+</button>
           
           
            </div>
    );
}