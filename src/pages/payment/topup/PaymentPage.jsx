import React, { useState, useEffect } from "react"
import PaymentService from "../services/topUpSevice/TopUpServices";
import WalletService from "../services/walletService/WalletService";
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const PaymentPage = () => {
    const [topUps, setTopUps] = useState([]);
    const [amount, setAmount] = useState([]);
    const [topUpMethods, setTopUpMethods] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [walletAmount, setWalletAmount] = useState([]);
    const [descriptionToast, setDescriptionToast] = useState([]);
    const [topUpId, setTopUpId] = useState([]);

    const toggleShowToast = () => setShowToast(!showToast);

    useEffect(() => {
      fetchTopUps();
      fetchWallet();
    }, []);

    const changeAmount = (amount) => setAmount(amount);
    const changeTopUpMethods = (topUpMethod) => setTopUpMethods(topUpMethod);

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
            setDescriptionToast("Berhasil membuat top up!")
            document.getElementById('addmodal').classList.remove('show');
            document.body.classList.remove('modal-open');
            fetchTopUps();
            setShowToast(true);
        } catch (error) {
            console.error("Error creating top-up:", error);
            setDescriptionToast(error);
            setShowToast(true);
        }
    }

    const deleteTopUp = async () => {
        try {
            const idTopUp = topUpId;
            await PaymentService.deleteTopUpById(idTopUp);
            setDescriptionToast("Berhasil menghapus top up!")
            fetchTopUps();
            setShowToast(true);
        }catch (error) {
            console.error("Error creating top-up:", error);
        }
    }

    const deleteAllTopUp = async () => {
        try {
            await PaymentService.deleteAllTopUp();
            setDescriptionToast("Berhasil menghapus semua top up!")
            fetchTopUps();
            setShowToast(true);
        }catch (error) {
            console.error("Error creating top-up:", error);
        }
    }

    const cancelTopUp = async () => {
        try {
            const idTopUp = topUpId;
            await PaymentService.cancelTopUp(idTopUp);
            setDescriptionToast("Berhasil me-cancel top up!")
            fetchTopUps();
            setShowToast(true);
        }catch (error) {
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
                <div className="">
                    <Dropdown as={ButtonGroup}>
                        <Button variant="success" data-bs-target="#addmodal" data-bs-toggle="modal">Tambah TopUp</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            <Dropdown.Item data-bs-toggle="modal" data-bs-target="#deleteAllModal">Hapus Semua</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {topUp.topUpMethod !== "CANCELLED" && (
                                                <Dropdown.Item data-bs-toggle="modal" data-bs-target="#cancelModal" onClick={() => setTopUpId(topUp.id)}>Cancel</Dropdown.Item>
                                            )}
                                            <Dropdown.Item data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setTopUpId(topUp.id)}>Hapus</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
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
                                <input onChange={(e) => changeAmount(e.target.value)} type="number" class="form-control" id="recipient-name"/>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Metode Top Up</label>
                                <select onChange={(e) => changeTopUpMethods(e.target.value)} class="form-select" aria-label="Default select example">
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
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">TopUp</strong>
                                </Toast.Header>
                            <Toast.Body>{descriptionToast}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
            <div class="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Apakah anda yakin ingin menghapus top up ini?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={deleteTopUp}>Yakin</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="deleteAllModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Apakah anda yakin ingin menghapus semua top up?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={deleteAllTopUp}>Yakin</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="cancelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Apakah anda yakin ingin mencancel top up ini?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={cancelTopUp}>Yakin</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default PaymentPage;
