import React, { useState, useEffect } from "react"
import PaymentService from "../services/topUpSevice/TopUpServices";
import WalletService from "../services/walletService/WalletService";
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';

const PaymentPage = () => {
    const [topUps, setTopUps] = useState([]);
    const [amount, setAmount] = useState([]);
    const [topUpMethods, setTopUpMethods] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [walletAmount, setWalletAmount] = useState([]);

    useEffect(() => {
      fetchTopUps();
      fetchWallet();
    }, []);

    const fetchTopUps = async () => {
      try {
        const topUpsData = await PaymentService.getAllTopUps();
        setTopUps(topUpsData);
      } catch (error) {
        console.error("Error fetching top-ups:", error);
      }
    };
    const fetchWallet = async () => {
        try {
            const wallet = await WalletService.getWalletByUserId("3df9d41b-33c3-42a1-b0a4-43cf0ffdc649");
            setWalletAmount(wallet.amount)
        } catch (error) {
            console.error("Error fetching top-ups:", error);
        }
      };

    const createTopUp = async () => {
        try {
            const wallet = await WalletService.getWalletByUserId("3df9d41b-33c3-42a1-b0a4-43cf0ffdc649");
            const topUpData = {
                userId: '3df9d41b-33c3-42a1-b0a4-43cf0ffdc649', 
                walletId: wallet.id, 
                amount: amount, 
                topUpMethod: topUpMethods 
            };
            await PaymentService.createTopUp(topUpData);
            fetchTopUps();
            document.getElementById('addmodal').classList.remove('show');
            document.body.classList.remove('modal-open');
            setShowToast(true);
        } catch (error) {
            console.error("Error creating top-up:", error);
        }
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "SUCCESS":
                return "success";
            case "WAITING_APPROVAL":
                return "info";
            case "REJECTED":
                return "danger";
            case "CANCELLED":
                return "secondary";
            default:
                return "light";
        }
    };

    return (
        <div className="container my-4">
            <div>
                <p className="fs-3">Uang kamu</p>
                <p className="fs-4 ms-2 fw-bold">Rp.<span>{walletAmount}</span></p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="fs-3">Histori TopUp</p>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-primary fw-bold rounded-pill" data-bs-target="#addmodal" data-bs-toggle="modal">
                        <span className="fw-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus fw-bold" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </span>tambah
                    </button>
                    <button type="button" className="btn btn-danger fw-bold rounded-pill">Hapus</button>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nilai</th>
                            <th scope="col">Metode</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Status</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {topUps.map((topUp, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>Rp.<span>{topUp.amount}</span></td>
                                <td>{topUp.topUpMethod}</td>
                                <td>{new Date(topUp.dateAdded).toLocaleDateString('id-ID')}</td>
                                <td>
                                    <span className={`badge rounded-pill text-bg-${getStatusBadgeClass(topUp.status)} fs-6`}>{topUp.status}</span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                            </svg>  
                                        </button>
                                        <ul className="dropdown-menu fw-bold">
                                            <li><p className="dropdown-item">Cancel</p></li>
                                            <li><p className="dropdown-item">Hapus</p></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class="modal fade" id="addmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Buat Top Up</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Amount</label>
                                <input onChange={(e) => setAmount(e.target.value)} type="number" class="form-control" id="recipient-name"/>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Metode Top Up</label>
                                <select onChange={(e) => setTopUpMethods(e.target.value)} class="form-select" aria-label="Default select example">
                                    <option selected>Pilih Metode Top Up</option>
                                    <option value="TRANSFER_BANK">Transfer Bank</option>
                                    <option value="KARTU_KREDIT">Kartu Kredit</option>
                                    <option value="E_WALLET">E-wallet</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={createTopUp}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <ToastContainer position="bottom-end">
                    <Toast>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">TopUp</strong>
                                </Toast.Header>
                            <Toast.Body>Top-up berhasil dibuat!</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    );
};
 
export default PaymentPage;
