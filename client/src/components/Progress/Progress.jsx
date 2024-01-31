import {Fragment, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {AiOutlineCalendar, AiOutlineDelete} from "react-icons/ai";
import {AiOutlineEdit} from "react-icons/ai";
import { TaskListByStatus } from '../../APIRequest/APIRequest';
import { useSelector } from 'react-redux';



const Progress = () => {
    

    useEffect(()=>{
        (async()=>{
            await TaskListByStatus("Progress");
        })()
    },[0]);

    const ProgressList=useSelector((state)=>state.task.Progress);
    
    return (
        <Fragment>
            <Container fluid={true} className="content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Task In Progress</h5>
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
                    {
                        ProgressList.map((item,i)=><div key={i} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="animated fadeInUp">{item.title}</h6>
                                <p className="animated fadeInUp">{item.description}</p>
                                <p className="m-0 animated fadeInUp p-0">
                                    <AiOutlineCalendar/> {item.createDate}
                                    <a className="icon-nav text-primary mx-1"><AiOutlineEdit /></a>
                                    <a className="icon-nav text-danger mx-1"><AiOutlineDelete /></a>
                                    <a className="badge float-end bg-primary">{item.status}</a>
                                </p>
                            </div>
                        </div>
                    </div>)
                    }
                    
                            
                          
                </div>
            </Container>
        </Fragment>
    );
};

export default Progress;