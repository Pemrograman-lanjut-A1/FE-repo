import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";

function OrderDetail() {
    const { id } = useParams()
    const [orders, setOrders] = useState([])
    
    const getOrder = async () => {
        try {
          const response = await fetch(`http://34.87.132.52/order-listing/order/${id}`, {
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
    
          setOrders(res)
        } catch (error) {
          throw new Error(error.message);
        }
    }
    useEffect(() => {
        getOrder()
    }, [])
  return (
    <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
      <h2 class="mb-5">Order Detail</h2>
      <div class="row mb-3">
      <table class="table table-striped">
        <thead class="table-primary rounded">
            <tr>
              <th scope="col ">Listing ID</th>
              <th scope="col ">Quantity</th>
            </tr>
          </thead>
          <tbody>
              {orders && orders.map((order, index) => (
                <tr key={index}>
                    <td>{order.listingId}</td>
                    <td>{order.quantity}</td>
                </tr>
              ))}
          </tbody>
      </table>
      </div>
      <div className="d-flex gap-3">
        <Link to={'/order'} className="btn btn-secondary">Back</Link>
      </div>
    </div>
  </div>
);
}

export default OrderDetail;
