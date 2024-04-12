import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './Slice/taskSlice';
import userSlice from './Slice/userSlice';

const store = configureStore({
	reducer: {
		task: taskSlice,
		user : userSlice
	}
});

export default store;
