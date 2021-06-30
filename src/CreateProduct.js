import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./CreateProduct.css";
import { db, storage } from "./firebase";
import firebase from "firebase";


function CreateProduct() {

    const history = useHistory();
    const[product, setProduct] = useState("");
    const[price, setPrice] = useState("");
    const[rating, setRating] = useState("");
    const[description, setDescription] = useState("");
    const[image, setImage] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
        console.log(product);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, function(error) {
            // Handle unsuccessful uploads
            console.log("unsuccessful")
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL()
                .then( url => {
                    db.collection("products").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        product: product,
                        price: price,
                        rating: rating,
                        description: description,
                        image: url
                    });
                    setProduct("");
                    setPrice("");
                    setRating("");
                    setDescription("");
                    setImage("");
                });
                history.push('/');
          });
    }

    return (
        <div className="createProduct">
            <h2>Create Product</h2>
            <form className="createProduct__form">

                <label htmlFor="productName">Product Name</label>
                <input type="text" name="productName" id="productName"
                value={ product } onChange={ e => setProduct(e.target.value) } />

                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" 
                value={ price } onChange={ e => setPrice(e.target.value) } />

                <label htmlFor="rating">Rating</label>
                <input type="text" name="rating" id="rating" 
                value={ rating } onChange={ e => setRating(e.target.value) } />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" 
                value={ description } onChange={ e => setDescription(e.target.value) }/>

                <label htmlFor="productImage">Product Image</label>
                <input type="file" name="productImage" id="productImage" onChange={ handleChange }/>

                <button onClick={ handleSubmit } type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateProduct
