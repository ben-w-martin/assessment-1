function Task({ task, handleDelete, toggleCompleted }) {
  const onDeleteClick = () => {
    handleDelete(task.id);
  };

  const onToggleClick = (e) => {
    toggleCompleted(task);
  };

  return (
    <div
      onClick={onToggleClick}
      className={
        task.isCompleted
          ? "tasks__card alt-font tasks__card--completed"
          : "tasks__card alt-font"
      }
    >
      <p className="tasks__text">{task.item}</p>
      <button onClick={onDeleteClick} type="button" className="btn btn-delete">
        X
      </button>
    </div>
  );
}

export { Task };
