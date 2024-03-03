import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "taskSlice",
  initialState: {
    /**
    * taskList is an array to store all the tasks.
    * @type {Task[]}
    */
    taskList: [],

    /**
    * filterStatus is an array to store all the selected filters.
    * @type {string[]}
    */
    filterStatus: [],
  },
  reducers: {
    /**
    * The refreshTask function is used to update the task list with a new payload.
    * @param {Task[]} state - The current state of the task list.
    * @param {Task[]} actions - The new payload of tasks.
    */
    refreshTask(state, actions) {
      state.taskList = actions.payload;
    },

    /**
    * The addTask function is responsible for appending a new task to the task list.
    * @param {Task[]} state - The current state of the task list.
    * @param {Task} action - The new task to be added.
    */
    addTask(state, action) {
      state.taskList = [...state.taskList, action.payload];
    },

    /**
    * The updateTask function is responsible for updating a specific task in the task list.
    * @param {Task[]} state - The current state of the task list.
    * @param {Task} action - The updated task with a new taskID.
    */
    updateTask(state, action) {
      let updatedTask = action.payload;
      let tasks = state.taskList;
      tasks = tasks.filter((task) => task.taskID !== updatedTask.taskID);
      state.taskList = [...tasks, updatedTask];
    },

    /**
    * The updateFilterStatus function is responsible for updating the filterStatus array
    * based on the selected filter and its checked status.
    * @param {string[]} state - The current state of the filterStatus array.
    * @param {[string, boolean]} action - The selected filter and its checked status.
    */
    updateFilterStatus(state, action) {
      console.log(action);
      console.log(state);

      const isChecked = action.payload[1];
      const status = action.payload[0];
      if (isChecked) {
        state.filterStatus.push(status);
      } else {
        state.filterStatus = state.filterStatus.filter((s) => s !== status);
      }
    },
  },
});

export const taskActions = slice.actions;
export default slice.reducer;
