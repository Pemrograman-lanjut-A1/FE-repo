import {React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditListingPage() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const BASE_API_URL = 'http://34.87.132.52/listing'
    const navigate = useNavigate()

    const getListing = async () => {
        try {
          const response = await fetch(`${BASE_API_URL}/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
          });
    
          const res = await response.json();
          if (res.status === 400) {
            throw new Error(res.message);
          }
          console.log(res)
          setName(res.name)
          setPrice(res.price)
          setDescription(res.description)
          setStock(res.stock)
          setImageUrl(res.imageUrl)

        } catch (error) {
          throw new Error(error.message);
        }
    }

    const handleSubmit = async () => {
        const updatedListing = {
            id,
            name,
            price,
            stock,
            description,
            imageUrl,
            sellerId: 'fakeSellerId'
        }
        try {
          const response = await fetch(`${BASE_API_URL}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(updatedListing)
          });
    
          const res = await response.json();
          if (res.status === 400) {
            throw new Error(res.message);
          }
        //   console.log(res)
        navigate('/sell')

        } catch (error) {
          throw new Error(error.message);
        }
    }

    useEffect(() => {
        getListing()
    }, [])
  return (
    <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
        <div className="d-flex flex-column justify-content-center gap-3 w-75 mb-5">
            <h2>Edit Listing: {name}</h2>
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
                <button class="btn btn-primary" 
                onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
</div>
);
}

export default EditListingPage;
