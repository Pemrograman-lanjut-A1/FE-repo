import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthMiddleware from "../auth/service/AuthMiddleware";
import AuthService from "../auth/service/AuthService";

function OrderHomepage() {
    const BASE_API_URL = 'http://34.87.132.52/order'
    const [orders, setOrders] = useState([])
    const [userId, setUserId] = useState('')
    const [error, setError] = useState('')

    const getOrders = async () => {
        try {
          const response = await fetch(`${BASE_API_URL}`, {
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
        //   console.log(res)
    
          setOrders(res)
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
      getOrders()
    })
  return (
    <div class="container border p-lg-5 text-white text-center">
    <div class="bg-dark d-flex flex-column justify-content-center align-items-center rounded p-lg-5">
        <div className="d-flex flex-column align-items-center gap-3 w-75 mb-3">
            <h2>My Orders</h2>
            <Link to='/sell' className="btn btn-secondary w-25">See Listing</Link>
        </div>
        <table class="table table-striped">
        <thead class="table-primary rounded">
            <tr>
              <th scope="col ">Order From</th>
              <th scope="col ">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {orders.map((order, index) => (
                <tr>
                <td>{order.buyerId}</td>
                <td>{order.status}</td>
                <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-danger">
                            Cancel
                        </button>
                        <Link>
                            <button className="btn btn-primary">Lihat</button>
                        </Link>
                        <button className="btn btn-success">
                            Confirm
                        </button>
                    </div>
                </td>
              </tr>
              ))}
          </tbody>
      </table>
      <div class="row">
        <div class="col d-flex justify-content-start flex-wrap gap-5">
        </div>
      </div>
    </div>
  </div>
  );
}

export default OrderHomepage;
