import React, {Fragment} from 'react';
import {Container} from "react-bootstrap";
import {AiOutlineCalendar} from "react-icons/ai";
import {AiOutlineEdit} from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai";


const Completed = () => {
    return (
        <Fragment>
            <Container fluid={true} className="content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Task Completed</h5>
                    </div>
                    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                        <div className="row">
                            <div className="col-8">
                                <input className="form-control w-100"/>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary w-100">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-0 m-0">

                            <div className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="animated fadeInUp">title</h6>
                                        <p className="animated fadeInUp">description</p>
                                        <p className="m-0 animated fadeInUp p-0">
                                            <AiOutlineCalendar/> createdDate
                                            <a   className="icon-nav text-primary mx-1"><AiOutlineEdit /></a>
                                            <a  className="icon-nav text-danger mx-1"><AiOutlineDelete /></a>
                                            <a className="badge float-end bg-success">status</a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                </div>
            </Container>
        </Fragment>
    );
};

export default Completed;