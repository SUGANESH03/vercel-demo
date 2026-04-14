"use client";
import './main.css';

export default function QuantityBtn({ quantity, setQuantity }: any) {

    function increment(){
        setQuantity((prev: number) => prev + 1);
    }

    function decrement(){
        setQuantity((prev: number) => prev > 1 ? prev - 1 : prev);
    }

    return(
        <div className="quantity-btn">
            <button className="plus" onClick={decrement}>-</button>
            <span className="span">{quantity}</span>
            <button className="minus" onClick={increment}>+</button>
        </div>
    );
}