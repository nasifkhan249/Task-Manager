import {Fragment, useEffect} from 'react';
import { TaskCountByStatus } from '../../APIRequest/APIRequest';
import { useSelector } from 'react-redux';




const Dashboard = () => {

   
   useEffect(()=>{
    (async()=>{
        await TaskCountByStatus();
    })()
   },[0]);

   const SummaryList=useSelector((state)=>state.summary.value);

   console.log(typeof SummaryList);



    return (
        <Fragment>
                <div className="container">
                    <div className="row">
                    {
                            SummaryList.map((item,i)=>
                                <div key={i} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="animated fadeInUp">Total {item._id}</h5>
                                            <h6 className="text-secondary animated fadeInUp">{item.sum}</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                      
                                
                                    
                                 
                    </div>
                </div>
        </Fragment>
    );
};

export default Dashboard;