import {useRef} from 'react';
import {Container, Row} from "react-bootstrap";
import {ErrorToast, IsEmpty} from "../../helpers/FormHelper.js";
import {CreateTask} from "../../APIRequest/APIRequest.js";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const navigate=useNavigate()

    let titleRef,descriptionRef,statusRef=useRef();
    const handleCreate=async ()=>{
        let title=titleRef.value;
        let description=descriptionRef.value;
        let status=statusRef.value;

        if(IsEmpty(title)){
            ErrorToast("Title must be required");

        }else if(IsEmpty(description)){
            ErrorToast("Description must be required");

        }else if(IsEmpty(status)){
            ErrorToast("Status must be required");

        }else {
            let result=await CreateTask(title,description,status);
            if(result===true){
                navigate("/All")
            }

        }
    }
    return (
        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4>Create New</h4>
                            <br/>
                            <input ref={(input) => titleRef = input} placeholder="Task Name"
                                   className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <textarea ref={(input) => descriptionRef = input} rows={5} placeholder="Task Description"
                                      className="form-control animated fadeInUp" type="text"/>
                            <br/>

                            <input ref={(input) => statusRef = input} placeholder="Status Name"
                                   className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <button onClick={handleCreate} className="btn float-end btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Create;