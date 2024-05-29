import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";

function ListingDetail() {
    const { id } = useParams()
    const [listing, setListing] = useState()
    
    const getListings = async () => {
        try {
          const response = await fetch(`http://34.87.132.52/listing/${id}`, {
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
    
          setListing(res)
        } catch (error) {
          throw new Error(error.message);
        }
    }
    useEffect(() => {
        getListings()
      }, [])
      console.log(listing)
  return (
    <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
      <h2 class="mb-5">Listing Detail</h2>
      <div class="row mb-3">
       {listing && (<div class="col">
                <div class="card" style={{"width":'15rem'}}>
                    <img src={listing.imageUrl}
                    class="card-img-top object-fit-cover" alt="..." height={190}/>
                    <div class="card-body">
                        <h5 class="card-title">{listing.name}</h5>
                        <p class="card-text">Rp{listing.price}</p>
                        <div className="d-flex gap-2">
                            {listing.description}
                        </div>
                    </div>
                </div>
        </div>)}
      </div>
      <div className="d-flex gap-3">
        <Link to={'/listing'} className="btn btn-secondary">Back</Link>
        <Link className="btn btn-danger"
            to={`/report/create?targetId=${id}&targetType=item`}>Report</Link>
      </div>
    </div>
  </div>
);
}

export default ListingDetail;
