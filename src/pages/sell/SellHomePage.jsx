import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AuthMiddleware from "../auth/service/AuthMiddleware";
import AuthService from "../auth/service/AuthService";

const SellHomePage = () => {
    const BASE_API_URL = 'http://34.87.132.52/listing'
    const [listings, setListings] = useState([])
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    const getListings = async () => {
        try {
          const response = await fetch(`${BASE_API_URL}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true'
            },
          });
    
          const res = await response.json();
          if (res.status === 400) {
            throw new Error(res.message);
          }
        //   console.log(res)
    
          setListings(res)
        } catch (error) {
          throw new Error(error.message);
        }
    }


    const handleDelete = async (id) => {
        try {
          const response = await fetch(`${BASE_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
          });
    
          const res = await response.json();
          if (res.status === 400) {
            throw new Error(res.message);
          }
        //   console.log(res)
    
          getListings()
        } catch (error) {
          throw new Error(error.message);
        }
    }

    
    useEffect(() => {
      try {
        const staffToken = localStorage.getItem('staffToken');
        const token = localStorage.getItem('token');

        if (AuthMiddleware.isStaffAuthenticated()) {
            const decodedToken = AuthService.parseJwt(staffToken);
            setUserId(decodedToken.Id);
        } else if (AuthMiddleware.isAuthenticated()) {
            const decodedToken = AuthService.parseJwt(token);
            setUserId(decodedToken.Id);
        } else {
            setError("No valid token found");
        }
        console.log({userId})
    } catch (error) {
        console.error("Error decoding token:", error);
        setError("Error occurred while decoding token");
    }
      getListings()
    })
    console.log(listings)

    return (
        <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
        <div className="d-flex flex-column align-items-center gap-3 w-75 mb-3">
            <h2>My Listings</h2>
            <Link to='/sell/create' className="btn btn-secondary w-25">Add new Listing</Link>
            <Link to='/order' className="btn btn-secondary w-25">See Order</Link>
        </div>
        {/* <div className="d-flex w-75 mb-5">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="q"/>
            <button class="btn btn-light" type="submit">Search</button>
        </div> */}
      <div class="row">
        <div class="col d-flex justify-content-start flex-wrap gap-5">
            {userId!=null && listings.map((listing, index) => (
                <div key={index} class="card" style={{"width":'15rem'}} onClick={() => console.log({userId})}>
                    <img src={listing.imageUrl}
                    class="card-img-top object-fit-cover" alt="..." height={190}/>
                    <div class="card-body">
                        <h5 class="card-title">{listing.name}</h5>
                        <p class="card-text">Rp{listing.price}</p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-danger" 
                            onClick={() => handleDelete(listing.id)}>
                                Delete
                            </button>
                            <Link to={`/sell/edit/${listing.id}`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  </div>
    );
};

export default SellHomePage;