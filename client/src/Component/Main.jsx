import React from 'react'
import InputField from './InputField';
import TaskTable from './TaskTable';

const Main = () => {
  return (
		<div className='d-flex align-items-center justify-content-start p-4'>
			<InputField/>
			<TaskTable/>
		</div>
	);
}

export default Main
