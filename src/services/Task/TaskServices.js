const TasksModel=require("../../models/TasksModel");
exports.CreateTask=async (req)=>{
    try {
        let reqBody=req.body;
        reqBody.email=req.headers.email;
        let data=await TasksModel.create(reqBody);
        return {status:"success",data:data}
    }catch (e) {
        return {status:"success",data:e}
    }
}

exports.DeleteTask=async(req)=>{
    try {
        const id = req.params.id;
        const query = { _id: id, email: req.headers.email };
        const data = await TasksModel.deleteOne(query);
        return {status:"success",data:data}
    } catch (e) {
        return {status:"fail",data:e}
    }
}

exports.UpdatedTask=async (req)=>{
    try {
        let id=req.params.id;
        let status=req.params.status;
        let email=req.headers.email
        let data=await TasksModel.updateOne({_id:id,email:email},{$set:{status:status}},{upsert:true});


            return {status:"success",data:data}

    }catch (e) {
        return {status:"success",data:e}
    }
}



exports.ListTaskByStatus = async (req) => {
    try {
        let email = req.headers['email'];
        let status = req.params.status;
        let data = await TasksModel.aggregate([
            {
                $match: { email: email, status: status }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    createDate: {
                        $dateToString: {
                            date: "$createdDate",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ]);


            return { status: "success", data: data };

    } catch (e) {
        return { status: "fail", data: e };
    }
};


exports.TaskStatusCount=async (req)=>{
    try {
        let email=req.headers.email;
        let data=await TasksModel.aggregate([{$match:{email:email}},{$group:{_id:"$status",sum:{$count:{}}}}]);

            return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}
    }
}