import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { minDate } from "../utils/minDate";
import { updateTask } from "../Redux/Slice/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskUpdate = ({ edit, setEdit }) => {
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.task);
  const [task, setTask] = useState({
    title: "",
    description: "",
    duedate: "",
    id: "",
  });

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setEdit(false);
  };

  useEffect(() => {
    setTask({
      title: taskDetail?.title,
      description: taskDetail?.description,
      duedate: taskDetail?.duedate,
      id: taskDetail?._id,
    });
  }, [taskDetail]);
  return (
    <>
      <Modal show={edit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action=''
            onSubmit={async (e) => {
              e.preventDefault();
              const result = await dispatch(updateTask(task));
              if (result.meta.requestStatus === "fulfilled") {
                setEdit(false);
              }
            }}>
            <div className='mb-3 mt-2'>
              <label htmlFor='taskTitle' className='fw-light form-label'>
                Title
              </label>
              <input
                onChange={handleChange}
                name='title'
                type='text'
                value={task.title}
                maxLength={500}
                required
                id='taskTitle'
                className='form-control'
                placeholder='Enter Title'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='taskDescription' className='fw-light form-label'>
                Description
              </label>
              <textarea
                onChange={handleChange}
                maxLength={5000}
                value={task.description}
                id='taskDescription'
                name='description'
                required
                className='form-control'
                placeholder='Enter Description'
                rows='3'></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='dueData' className='fw-light form-label'>
                Due Date
              </label>
              <input
                onChange={handleChange}
                min={minDate()}
                value={task.duedate}
                required
                name='duedate'
                id='dueData'
                className='form-control'
                type='date'
              />
            </div>
            <hr />
            <div className='d-flex justify-content-end'>
              <button className='btn btn-info' type='submit'>
                Update Task
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskUpdate;
