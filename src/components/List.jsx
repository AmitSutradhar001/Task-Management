import { useContext } from "react";
import ArrayContext from "../store/store";

const List = () => {
  const { todos, setTodos, setItem, setEdit } = useContext(ArrayContext);

  const handleDelete = (index) => {
    console.log(index);
    const newTodos = todos.filter((todo, i) => {
      return i !== index;
    });
    window.localStorage.setItem("todos", JSON.stringify(newTodos));

    setTodos(newTodos);
  };
  const handleEdit = (index) => {
    const editedItem = todos[index];
    setItem({
      title: editedItem.title,
      description: editedItem.description,
      dateTime: editedItem.dateTime,
    });
    setEdit(index);
  };
  const handleChecked = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const toggleDetails = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, showDetails: !todo.showDetails };
      }
      return todo;
    });
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  return (
    <div className="  text-white flex flex-col gap-4">
      {todos?.map((todo, index) => {
        return (
          <div
            key={todo}
            className="bg-slate-600 rounded-md flex flex-row w-96 min-w-max justify-between"
          >
            <div className="flex flex-row w-96 min-w-max justify-between m-3 ">
              <input
                className="w-4"
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleChecked(index)}
                disabled={todo.showDetails}
              />
              <div className={todo.completed ? "line-through flex" : "flex"}>
                <div
                  className={
                    todo.showDetails ? "flex-col pl-4 pr-4 " : "flex-row"
                  }
                >
                  <p className="mt-4">{todo.title}</p>
                  {todo.showDetails && (
                    <>
                      <p>{todo.description}</p>
                      <p>{todo.dateTime.toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-2 p-3">
                <button
                  className="bg-green-700 p-4 w-20 pt-1 pb-1 rounded-lg hover:bg-green-900"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(index);
                  }}
                  disabled={todo.completed}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 p-4 pt-1 pb-1 w-20 rounded-lg hover:bg-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(index);
                  }}
                >
                  delete
                </button>
                <button
                  className="text-white p-4  pt-1 pb-1 rounded-lg hover:text-blue-800"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDetails(index);
                  }}
                  disabled={todo.completed}
                >
                  {todo.showDetails ? "See Less" : "See More..."}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
