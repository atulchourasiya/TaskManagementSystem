import { useRef } from "react";
import "./InputField.css";
import { useDispatch } from "react-redux";
import { addNewTask } from "../Redux/Slice/taskSlice";
import { minDate } from "../utils/minDate";

const InputField = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const dispatch = useDispatch();

  return (
    <div className='InputFieldContainer'>
      <form
        id='formContainer'
        className='m-3 p-3'
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await dispatch(
            addNewTask({
              title: titleRef.current.value,
              description: descriptionRef.current.value,
              duedate: dueDateRef.current.value,
            })
          );
          if (result.meta.requestStatus === "fulfilled") {
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            dueDateRef.current.value = "";
          }
        }}>
        <div className='tableHeader'>
          <h2 className='p-2 m-0'>New Task</h2>
          <hr className='m-0 p-0' />
        </div>
        <div className='mb-3 mt-2'>
          <label htmlFor='taskTitle' className='fw-light form-label'>
            Title
          </label>
          <input
            ref={titleRef}
            type='text'
            maxLength={100}
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
            ref={descriptionRef}
            maxLength={5000}
            id='taskDescription'
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
            ref={dueDateRef}
            min={minDate()}
            required
            id='dueData'
            className='form-control'
            type='date'
          />
        </div>
        <div>
          <button className='btn btn-info' type='submit'>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputField;
