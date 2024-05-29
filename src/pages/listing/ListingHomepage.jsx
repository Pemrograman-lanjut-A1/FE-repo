import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ListingHomepage = () => {
    const [listings, setListings] = useState([])

    const getListings = async () => {
        try {
          const response = await fetch(`http://34.87.132.52/listing`, {
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
    
          setListings(res)
        } catch (error) {
          throw new Error(error.message);
        }
    }

    useEffect(() => {
        getListings()
    }, [])

    return (
        <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
        <div className="d-flex flex-column align-items-center gap-3 w-75 mb-3">
            <h2>All Listings</h2>
        </div>
      <div class="row">
        <div class="col d-flex justify-content-start flex-wrap gap-5">
            {listings.map((listing, index) => (
                <div class="card" style={{"width":'15rem'}}>
                    <img src={listing.imageUrl}
                    class="card-img-top object-fit-cover" alt="..." height={190}/>
                    <div class="card-body">
                        <h5 class="card-title">{listing.name}</h5>
                        <p class="card-text">Rp{listing.price}</p>
                        <div className="d-flex gap-2">
                            <Link to={`/listing/${listing.id}`}>
                                <button className="btn btn-primary">See Detail</button>
                            </Link>
                            <Link className="btn btn-danger"
                            to={`/report/create?targetId=${listing.id}&targetType=item`}>Report</Link>
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

export default ListingHomepage;