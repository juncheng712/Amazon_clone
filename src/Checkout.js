import React from 'react';
import "./Checkout.css";
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {

    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout__ad" />
                <div>
                    <h3>Hello { user?.email }</h3>
                    <h2 className="checkout__title">Your shopping Basket</h2>

                    { basket.map(items => (
                        <CheckoutProduct
                        id={ items.id }
                        title={ items.title }
                        image={ items.image }
                        price={ items.price }
                        rating={ items.rating }
                        />
                    )) }
                    {/* checkout product */}
                    {/* BasketItem */}
                    {/* BasketItem */}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
