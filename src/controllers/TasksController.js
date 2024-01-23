const {CreateTask, DeleteTask,UpdatedTask, ListTaskByStatus, TaskStatusCount} = require("../services/Task/TaskServices");

exports.TaskCreate=async (req,res)=> {
    let result = await CreateTask(req);
    res.status(200).json(result);
}


exports.TaskDelete=async (req,res)=>{
    let result=await DeleteTask(req);
    res.status(200).json(result);
}

exports.TaskUpdate=async (req,res)=>{
    let result=await UpdatedTask(req);
    res.status(200).json(result);
}

exports.TaskListByStatus=async (req,res)=>{
    let result=await ListTaskByStatus(req);
    res.status(200).json(result);
}



exports.TaskCount=async (req,res)=>{
    let result = await TaskStatusCount(req);
    res.status(200).json(result);
}