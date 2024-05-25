import React, { useState, useEffect } from "react"
import PaymentService from "../services/topUpSevice/TopUpServices";
import WalletService from "../services/walletService/WalletService";
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import AuthService from "../../auth/service/AuthService";
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from "../../auth/service/AuthMiddleware";

const PaymentPage = () => {
    const [topUps, setTopUps] = useState([]);
    const [amount, setAmount] = useState([]);
    const [topUpMethods, setTopUpMethods] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [walletAmount, setWalletAmount] = useState([]);
    const [descriptionToast, setDescriptionToast] = useState([]);
    const [topUpId, setTopUpId] = useState([]);
    const [userWallet, setUserWallet] = useState(null);
    const [userId, setUserId] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const initialize = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token || !AuthMiddleware.isAuthenticated()) {
                    navigate('/signin');
                    return;
                }
                const isExpired = await AuthMiddleware.isExpired();
                if (isExpired) {
                    AuthMiddleware.logout();
                    setDescriptionToast("Session Berakhir, Mohon Login Ulang");
                    setShowToast(true);
                    navigate('/signin');
                    return;
                }
                console.log("dwadawdaw")
                const decodedToken = AuthService.parseJwt(token);
                const userId = decodedToken.Id;
                setUserId(userId);
                setLoggedIn(true);

                const wallet = await WalletService.getWalletByUserId(userId);
                setWalletAmount(wallet.amount);
                setUserWallet(wallet);

                const topUpsData = await PaymentService.getTopUpByUserId(userId);
                setTopUps(topUpsData);
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        };

        initialize();
    }, [navigate]);

    const fetchTopUps = async () => {
        try {
            if (userId) {
                const topUpsData = await PaymentService.getTopUpByUserId(userId);
                setTopUps(topUpsData);
            }
        } catch (error) {
            console.error("Error fetching top-ups:", error);
        }
    };

    const handleCreateWallet = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = AuthService.parseJwt(token);
                const userId = decodedToken.Id;
                const walletData = { userId };
                const wallet = await WalletService.createWallet(walletData);
                setUserWallet(wallet.wallet);
                setWalletAmount(wallet.wallet.amount);
                setUserId(userId);
                setLoggedIn(true);

                const topUpsData = await PaymentService.getTopUpByUserId(userId);
                setTopUps(topUpsData);
            }
        } catch (error) {
            console.error("Error creating user wallet:", error);
        }
    };

       const createTopUp = async () => {
        try {
            const topUpData = {
                userId,
                walletId: userWallet.id,
                amount,
                topUpMethod: topUpMethods
            };
            await PaymentService.createTopUp(topUpData);
            setDescriptionToast("Berhasil membuat top up!");
            document.getElementById('addmodal').classList.remove('show');
            document.body.classList.remove('modal-open');
            await fetchTopUps();
            setShowToast(true);
        } catch (error) {
            console.error("Error creating top-up:", error);
            setDescriptionToast(error.message);
            setShowToast(true);
        }
    };

    const deleteTopUp = async () => {
        try {
            await PaymentService.deleteTopUpById(topUpId);
            setDescriptionToast("Berhasil menghapus top up!");
            await fetchTopUps();
            setShowToast(true);
        } catch (error) {
            console.error("Error deleting top-up:", error);
        }
    };

    const deleteAllTopUp = async () => {
        try {
            await PaymentService.deleteAllTopUp();
            setDescriptionToast("Berhasil menghapus semua top up!");
            await fetchTopUps();
            setShowToast(true);
        } catch (error) {
            console.error("Error deleting all top-ups:", error);
        }
    };

    const cancelTopUp = async () => {
        try {
            await PaymentService.cancelTopUp(topUpId);
            setDescriptionToast("Berhasil me-cancel top up!");
            await fetchTopUps();
            setShowToast(true);
        } catch (error) {
            console.error("Error canceling top-up:", error);
        }
    };

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

    const changeAmount = (amount) => setAmount(amount);
    const changeTopUpMethods = (topUpMethod) => setTopUpMethods(topUpMethod);
    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <div className="container my-4">
            {!userWallet ? (
                <div className="text-center">
                    <>
                        <h1>Anda belum memiliki wallet</h1>
                        <div className="card w-50 mx-auto mt-5 p-4">
                            <div className="card-body">
                                <h5 className="card-title">Buat Wallet</h5>
                                <button className="btn btn-primary" onClick={handleCreateWallet}>Buat Wallet</button>
                            </div>
                        </div>
                    </>
                </div>
            ) : (
                <>
                    <div>
                        <p className="fs-3">Uang kamu</p>
                        <p className="fs-4 ms-2 fw-bold">Rp.<span>{walletAmount}</span></p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="fs-3">Histori TopUp</p>
                        <div>
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
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" />
                                                <Dropdown.Menu>
                                                    {topUp.status !== "CANCELLED" && (
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
                    <div className="modal fade" id="addmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Buat Top Up</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Amount</label>
                                            <input onChange={(e) => changeAmount(e.target.value)} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Metode Top Up</label>
                                            <select onChange={(e) => changeTopUpMethods(e.target.value)} className="form-select" aria-label="Default select example">
                                                <option selected>Pilih Metode Top Up</option>
                                                <option value="TRANSFER_BANK">Transfer Bank</option>
                                                <option value="KARTU_KREDIT">Kartu Kredit</option>
                                                <option value="E_WALLET">E-wallet</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={createTopUp}>Save changes</button>
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
                    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Apakah anda yakin ingin menghapus top up ini?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteTopUp}>Yakin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="deleteAllModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Apakah anda yakin ingin menghapus semua top up?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteAllTopUp}>Yakin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="cancelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Hapus Top Up</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Apakah anda yakin ingin mencancel top up ini?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={cancelTopUp}>Yakin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
 
export default PaymentPage;
