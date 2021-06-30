import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './Home.css';
import Product from './Product';

function Home() {

    const [items, setItem] = useState([]);

    useEffect(()=> {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {  // every time the code changes, snapshot will be triggered
          setItem(snapshot.docs.map(doc => ({
            id: doc.id,
            item: doc.data()
          })));   
         }) // doc.data() -> get all the data
      }, []);
    
    return (
        <div className="home">
            <div className="home__container">
                <img 
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                alt="" 
                className="home__image"
                 />

                <div className="home__products">
                    {
                        items?.map(({id, item}) => (
                        <Product 
                        id = { id }
                        title ={ item.product }
                        price = { parseInt(item.price) } 
                        rating = { parseInt(item.rating) }
                        description = { item.description }
                        image = { item.image }
                        />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
