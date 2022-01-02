import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";


function ModalPop() {
    const [show, popup] = useState(false);
    const modalOpen = () => popup(true);
    const modalClose = () => popup(false);

    return (
        <div >
            <Button variant="Success" data-backdrop="static" onClick={modalOpen}>Leaderboard</Button>
            <Modal className="modal90w" isvisible={true} show={show} onHide={modalClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter" data-keyboard="false" data-backdrop="static"
                centered>
                <Modal.Body>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Leader Board
                    </Modal.Title>
                    <div className='mainModal'>
                            <table className='bestOverallRecords'>

                                <tbody>
                                    <tr>
                                        <th>Time</th>
                                        <th>Best Speed</th>
                                        <th>Best Accuracy</th>
                                        <th>Average Speed</th>
                                        <th>Average Accuracy</th>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                    <tr>
                                        <td>30</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className='bestOverallRecords'>
                                <div className='language'>C</div>
                                <tbody>
                                    <tr>
                                        <th>Time</th>
                                        <th>Best Speed</th>
                                        <th>Best Accuracy</th>
                                        <th>Average Speed</th>
                                        <th>Average Accuracy</th>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                    <tr>
                                        <td>30</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>{user.bestSpeed}</td>
                                        <td>{user.bestAccuracy}</td>
                                        <td>{user.averageSpeed}</td>
                                        <td>{user.averageAccuracy}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalPop
