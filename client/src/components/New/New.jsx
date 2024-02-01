import { Fragment, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {AiOutlineEdit,AiOutlineCalendar,AiOutlineDelete} from "react-icons/ai";
import { ListByStatus } from '../../APIRequest/APIRequest';
import { DeleteTODO } from '../../helpers/DeleteAlert';
import {UpdateTODO} from "../../helpers/UpdateAlert.js";






const New = () => {
    const [data_new,setData_new]=useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
 
    useEffect(()=>{
        (async()=>{
            let newTask=await ListByStatus("New");
            setData_new(newTask);
        })()
    },[refreshKey]);
    const DeleteItem =async (id) => {
       await DeleteTODO(id).then((result) => {
            if (result === true) {
                setRefreshKey(prevKey=>prevKey+1);
            }
        });
    };

    const UpdateItem=async (id,status)=>{
        await UpdateTODO(id, status).then((result) => {
            if (result === true) {
                setRefreshKey(prevKey => prevKey + 1);
            }
        })
    }
    return (
        <Fragment>
            <Container fluid={true} className="content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Task New</h5>
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
                    data_new.map((item,i)=>{
                        return(
                            <div key={i} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="animated fadeInUp">{item.title}</h6>
                                        <p className="animated fadeInUp">
                                            {item.description}</p>
                                        <p className="m-0 animated fadeInUp p-0">
                                            <AiOutlineCalendar/> {item.createDate}	
                                            <a onClick={()=>UpdateItem(item._id)} className="icon-nav text-primary mx-1"><AiOutlineEdit/></a>
                                            <a onClick={()=>DeleteItem(item._id)} className="icon-nav text-danger mx-1"><AiOutlineDelete/></a>
                                            <a className="badge float-end bg-info">
                                                {item.status}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }
                </div>
            </Container>
        </Fragment>
    );
};

export default New;