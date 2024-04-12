import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import "./TaskTable.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteTask, fetchAllTask } from "../Redux/Slice/taskSlice";
import Pagination from "react-bootstrap/Pagination";

const TaskTable = (props) => {
  const { task, hasPreviousPage, hasNextPage, totalPage } = useSelector(
    (state) => state.task
  );
  const [deletion, setDeletion] = useState(false);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const handleClose = () => {
    setDeletion(false);
  };
  const handleDelete = async () => {
    if (deletion) {
      const result = await dispatch(deleteTask(deletion));
      if (result.meta.requestStatus === "fulfilled") {
        handleClose();
      }
    }
  };
  return (
    <div className='container tableContainer'>
      <div className='tableHeader'>
        <h2 className='p-2 m-0'>Task List</h2>
        <hr className='m-0 p-0' />
      </div>
      <table className='table table-striped rounded'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Due Date</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {task?.map((item, index) => {
            return (
              <TaskCard
                index={index + 1}
                title={item.title}
                description={item.description}
                status={item.status}
                duedate={item.duedate}
                id={item._id}
                setDeletion={setDeletion}
              />
            );
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-end'>
        <Pagination>
          <Pagination.Prev
            disabled={!hasPreviousPage}
            onClick={() => {
              setActivePage(activePage - 1);
              dispatch(fetchAllTask(activePage - 1));
            }}
          />
          {Array(totalPage)
            .fill()
            .map((_, index) => {
              return (
                <Pagination.Item
                  active={index + 1 === activePage}
                  onClick={() => {
                    setActivePage(index + 1);
                    dispatch(fetchAllTask(index + 1));
                  }}>
                  {index + 1}
                </Pagination.Item>
              );
            })}
          <Pagination.Next
            disabled={!hasNextPage}
            onClick={() => {
              setActivePage(activePage + 1);
              dispatch(fetchAllTask(activePage + 1));
            }}
          />
        </Pagination>
      </div>
      <Modal show={deletion} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the task?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            Cancel
          </button>
          <button className='btn btn-info' onClick={handleDelete}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskTable;
