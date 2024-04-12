import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById, updateStatus } from "../Redux/Slice/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import "./TaskDetail.css";
import TaskUpdate from "./TaskUpdate";

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.task);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getTaskById(id));
  }, []);
  return (
    <div className='container viewDetail d-flex align-items-center justify-content-center flex-column mt-3'>
      <div className='w-100 d-flex align-item-center justify-content-between  mb-2'>
        <div className='d-flex align-items-center'>
          <div className='tableHeader'>
            <h2 className='p-2 m-0'>Task Detail</h2>
            <hr className='m-0 p-0' />
          </div>
          <div
            className={
              (taskDetail?.status === "Pending"
                ? "bg-warning "
                : "bg-success ") + "d-flex justify-content-end rounded p-1 mx-2"
            }>
            {taskDetail?.status}
          </div>
        </div>
        {taskDetail?.status === "Pending" && (
          <div className='d-flex align-items-center'>
            <button
              className='btn btn-info'
              onClick={(e) => {
                dispatch(
                  updateStatus({
                    id: taskDetail?._id,
                    status: "Completed",
                  })
                );
              }}
            >Mark As Completed ✅</button>
          </div>
        )}
      </div>
      <div className='d-flex w-100'>
        <div className='border w-50 p-2 rounded mx-2 taskDetailField'>
          <small>Title</small>
          <p className='m-0'>{taskDetail?.title}</p>
        </div>
        <div className='border w-50 p-2 rounded mx-2 taskDetailField'>
          <small>Due Date</small>
          <p className='m-0'>{taskDetail?.duedate}</p>
        </div>
      </div>

      <div className='d-flex w-100 mt-3'>
        <div className='border w-100 p-2 rounded mx-2 taskDetailField'>
          <small>Description</small>
          <p className='m-0'>{taskDetail?.description}</p>
        </div>
      </div>

      <div className='d-flex w-100 mt-3'>
        <button className='btn btn-info' onClick={() => setEdit(true)}>
          Edit
        </button>
      </div>
      <TaskUpdate edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default TaskDetail;
