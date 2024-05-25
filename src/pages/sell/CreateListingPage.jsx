import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateListingPage() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const BASE_API_URL = 'http://34.87.132.52/listing'
    const navigate = useNavigate();

    const handleSubmit = async () => {

        const newListing = {
            name,
            price,
            stock,
            description,
            imageUrl,
            sellerId: 'fakeId'
        }
        try {
          const response = await fetch(`${BASE_API_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(newListing)
          });
    
          const res = await response.json();
          if (res.status === 400) {
            throw new Error(res.message);
          }
        //   console.log(res)
        // navigate('/sell')

        } catch (error) {
          console.log(error)
          throw new Error(error.message);
        }
    }
  return (
    <div class="container border p-lg-5 text-white text-center">
        <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
            <div className="d-flex flex-column justify-content-center gap-3 w-75 mb-5">
                <h2>Create new Listing</h2>
                <form className="d-flex flex-column align-items-center gap-3">
                    <div class="form-group w-50 d-flex flex-column align-items-start gap-1">
                        <label for="name">Name</label>
                        <input required type="text" class="form-control" id="name" placeholder="Enter name"
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="form-group w-50 d-flex flex-column align-items-start gap-1">
                        <label for="price">Price</label>
                        <input required type="number" class="form-control" id="price" placeholder="Enter price"
                        value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div class="form-group w-50 d-flex flex-column align-items-start gap-1">
                        <label for="stock">Stock</label>
                        <input required type="number" class="form-control" id="stock" placeholder="Enter stock"
                        value={stock} onChange={(e) => setStock(e.target.value)}/>
                    </div>
                    <div class="form-group w-50 d-flex flex-column align-items-start gap-1">
                        <label for="description">Description</label>
                        <input type="text" class="form-control" id="description" placeholder="Enter description"
                        value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div class="form-group w-50 d-flex flex-column align-items-start gap-1">
                        <label for="imageUrl">Image Url</label>
                        <input required type="text" class="form-control" id="imageUrl" placeholder="Enter Image Url"
                        value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary" 
                    onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    </div>
);
}

export default CreateListingPage;
