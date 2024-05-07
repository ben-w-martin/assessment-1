import * as formik from "formik";
import { useEffect, useState } from "react";
import * as todoService from "../services/todoService";
import { Task } from "./Task";

function Todo() {
  const [initialValues] = useState({
    item: "",
  });

  const [tasks, setTasks] = useState({
    array: [],
    components: [],
  });

  useEffect(() => {
    todoService.getAll().then(onGetTasksSuccess).catch(onGetTasksError);
  }, []);

  useEffect(() => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks.components = newTasks.array.map(taskMapper);
      return newTasks;
    });
  }, [tasks.array]);

  const taskMapper = (task) => {
    return (
      <Task
        key={"task-" + task.id}
        handleDelete={handleDelete}
        toggleCompleted={toggleCompleted}
        task={task}
      />
    );
  };

  const onGetTasksSuccess = (response) => {
    console.log("onGetTasksSuccess", response);

    const { data } = response;

    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks.array = data;
      return newTasks;
    });
  };

  const onGetTasksError = (error) => {
    console.error("onGetTasksError", error);
  };

  const handleSubmit = (values) => {
    console.log(values);

    todoService
      .add(values)
      .then((resp) => onAddTaskSuccess(resp, values))
      .catch(onAddTaskError);
  };

  const onAddTaskSuccess = (response, values) => {
    console.log("onAddTaskSuccess", response);
    const { data } = response;

    setTasks((prev) => {
      const newTasks = { ...prev };
      const newArray = [...newTasks.array];
      newArray.push({ ...values, id: data, isCompleted: false });
      newTasks.array = newArray;
      return newTasks;
    });
  };

  const onAddTaskError = (error) => {
    console.error("onAddTaskError", error);
  };

  const handleDelete = (id) => {
    todoService
      .deleteById(id)
      .then((resp) => onTaskDeleteSuccess(resp, id))
      .catch(onTaskDeleteError);
  };

  const onTaskDeleteSuccess = (response, id) => {
    console.log("onTaskDeleteSuccess", response);

    setTasks((prev) => {
      const newTasks = { ...prev };
      const newArray = [
        ...newTasks.array.filter((item) => {
          return item.id !== id;
        }),
      ];

      newTasks.array = newArray;
      return newTasks;
    });
  };

  const onTaskDeleteError = (error) => {
    console.error("onTaskDeleteError", error);
  };

  const toggleCompleted = (task) => {
    task.isCompleted = !task.isCompleted;

    todoService
      .update(task, task.id)
      .then((resp) => onUpdateTaskSuccess(resp, task))
      .catch(onUpdateTaskError);
  };

  const onUpdateTaskSuccess = (response, updatedTask) => {
    console.log("onUpdateTaskSuccess", response);

    setTasks((prev) => {
      const newTasks = { ...prev };
      const newArray = [
        ...newTasks.array.map((item) => {
          return item.id === updatedTask.id ? updatedTask : item;
        }),
      ];

      newTasks.array = newArray;
      return newTasks;
    });
  };

  const onUpdateTaskError = (error) => {
    console.error("onUpdateTaskSuccess", error);
  };

  return (
    <div className="todo-form-container">
      <h1 className="heading-primary todo-heading">Todo List</h1>
      <formik.Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <formik.Form>
          <div className="form-group todo__form-group">
            <label htmlFor="item">New task</label>
            <div className="todo__input-inline">
              <formik.Field className="todo__field" name="item" type="text" />
              <button type="submit" className="btn btn-submit btn-todo">
                Add
              </button>
            </div>
          </div>
        </formik.Form>
      </formik.Formik>
      <div className="tasks-container">
        <h3 className="heading-teritiary tasks-heading">My Tasks</h3>
        <div className="tasks__list">{tasks.components}</div>
      </div>
    </div>
  );
}

export { Todo };
