import { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import ArrayContext from "./store/store";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState({
    title: "",
    description: "",
    completed: false,
    showDetails: false,
    dateTime: new Date(),
  });
  const [err, setErr] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const savedTasks = window.localStorage.getItem("todos");
    if (savedTasks) {
      setTodos(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <ArrayContext.Provider
      value={{ todos, setTodos, item, setItem, edit, setEdit, err, setErr }}
    >
      <div className="flex flex-col justify-center items-center mt-8">
        <Form />
        {err && (
          <p className="text-white font-semibold font-serif mt-2">{err}</p>
        )}
        <div className="border-b-2 border-white w-96 m-4 md:w-[800px]"></div>
        <List />
      </div>
    </ArrayContext.Provider>
  );
};

export default App;
