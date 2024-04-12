import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastSuccess } from "../../utils/toast";

const initialState = {
  task: null,
  taskDetail: null,
  totalPage : 0,
  hasPreviousPage : null,
  hasNextPage : null
};

export const fetchAllTask = createAsyncThunk("task/fetchAllTask", async (page = 1) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/task/fetchAllTask?page=${page}`,
      {
        method: "GET",
		credentials : 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else throw new Error("Something went wrong!");
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (taskId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/task/getTaskById/${taskId}`,
        {
          method: "GET",
		  credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else throw new Error("Something went wrong!");
    } catch (err) {
      console.error(err);
      return null;
    }
  }
);

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async (task, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/task/addNewTask`,
        {
          method: "POST",
		  credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
		toastSuccess("Task Added Successfully!")
        dispatch(fetchAllTask());
        return res;
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const updateStatus = createAsyncThunk(
  "task/updateStatus",
  async (task, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/task/updateStatusById/${task.id}`,
        {
          method: "PUT",
		  credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: task.status }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        toastSuccess("Status Updated Successfully");
        dispatch(getTaskById(task.id));
        dispatch(fetchAllTask());
        return res;
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (task, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/task/updateTaskById/${task.id}`,
        {
          method: "PUT",
		  credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        toastSuccess("Task Updated Successfully");
        dispatch(getTaskById(task.id));
        dispatch(fetchAllTask());
        return res;
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (deleteTaskId, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/task/deleteTask/${deleteTaskId}`,
        {
          method: "DELETE",
		  credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch(fetchAllTask());
        toastSuccess("Task Deleted Successfullly");
        return res;
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: {
    [fetchAllTask.fulfilled]: (state, action) => {
      state.task = action.payload.task;
      state.totalPage = action.payload.totalPage;
      state.hasNextPage = action.payload.hasNextPage;
      state.hasPreviousPage = action.payload.hasPreviousPage;
    },
    [fetchAllTask.rejected]: (state) => {
      state.task = null;
    },
    [getTaskById.fulfilled]: (state, action) => {
      state.taskDetail = action.payload[0];
    },
    [getTaskById.rejected]: (state) => {
      state.taskDetail = null;
    },
  },
});
export default taskSlice.reducer;
