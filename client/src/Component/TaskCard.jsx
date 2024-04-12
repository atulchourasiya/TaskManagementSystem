import React from "react";
import { Link } from "react-router-dom";

const TaskCard = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.duedate}</td>
      <td><button className={props.status === 'Pending'? 'btn btn-warning' : 'btn-success btn'}>{props.status}</button></td>
      <td>
        <Link to={`/taskDetail/${props.id}`} className='btn btn-info mx-1' title="View Detail">View Detail</Link>
        <button className='btn btn-info mx-1' title="Delete" onClick={()=>props.setDeletion(props.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskCard;
