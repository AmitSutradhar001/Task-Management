import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrayContext from "../store/store";

const Form = () => {
  const { item, setItem, todos, setTodos, edit, setEdit, setErr } =
    useContext(ArrayContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (item.title === "" || item.description === "") {
      setErr("Please fill all the fields!");
      return;
    } else {
      setErr("");
    }
    setTodos([...todos, item]);
    window.localStorage.setItem("todos", JSON.stringify([...todos, item]));
    setItem({
      title: "",
      description: "",
      dateTime: new Date(),
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    if (edit !== null) {
      if (item.title === "" || item.description === "") {
        setErr("Please fill all the fields!");
        return;
      } else {
        setErr("");
      }
      const updatedTodos = [...todos];
      updatedTodos[edit] = item;
      setTodos(updatedTodos);
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setItem({
        title: "",
        description: "",
        dateTime: new Date(),
      });
    }
    setEdit(null);
  };

  return (
    <>
      <form>
        <div className="bg-slate-700 text-white w-auto p-4 flex flex-col justify-start rounded-lg font-serif font-semibold md:flex-row">
          <input
            className="rounded-t-lg p-3 bg-slate-700 focus:outline-none placeholder:text-white"
            type="text"
            required
            value={item.title}
            placeholder="Enter the title!"
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
          <input
            className=" p-3 bg-slate-700 placeholder:text-white focus:outline-none"
            type="text"
            value={item.description}
            placeholder="Enter the description!"
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />
          <DatePicker
            required
            selected={item?.dateTime}
            onChange={(d) => setItem({ ...item, dateTime: d })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded  focus:outline-none p-3 bg-slate-700 placeholder:text-white"
          />
          <button
            className="bg-orange-400 hover:bg-orange-500  p-2 rounded"
            onClick={edit !== null ? handleEdit : handleClick}
          >
            {edit ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
