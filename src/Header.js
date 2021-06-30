import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider'
import { auth } from './firebase';

function Header() {
    const [ { basket, user }, dispatch ] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                {/* Amazon Logo */}
                <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" className="header__logo"/>
            </Link>

            {/* Search */}
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                {/* Icon Logo */}
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <Link to={!user && "/login"}>  {/* Push to login page only if no user */}
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">Hello { user ? user?.email : "Guest"}</span>
                        <span className="header__optionLineTwo">{ user ? "Sign Out" : "Sign In" }</span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <Link to="/createProduct">
                    <div className="header__option">
                        <span className="header__optionLineOne">Add</span>
                        <span className="header__optionLineTwo">Products</span>
                    </div>
                </Link>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__BasketCount">{ basket?.length }</span>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Header
