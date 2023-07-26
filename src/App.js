import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");

  function handleAddTodo(todo) {
    if (!todo) return;
    setTodo((todos) => [...todos, todo]);
  }

  function handleDeleteTodo(id) {
    setTodo((todos) => todos.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setTodo((todos) =>
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
  return (
    <div className="content-container">
      <Welcome />
      <NewToDoItem
        title={title}
        setTitle={setTitle}
        todo={todo}
        addTodo={handleAddTodo}
      />
      <DisplayToDo
        todo={todo}
        deleteTodo={handleDeleteTodo}
        handleToggle={handleToggle}
      />
    </div>
  );
}

function Welcome() {
  return (
    <div className="header">
      <h1>TODO LIST</h1>
    </div>
  );
}

function NewToDoItem({ title, setTitle, addTodo, todo }) {
  function handleTodoSubmit(e) {
    e.preventDefault();

    if (!title) return;

    const newTodo = { title, completed: false, id: Date.now() };

    addTodo(newTodo);
    setTitle("");
  }
  return (
    <div className="form">
      <form onSubmit={handleTodoSubmit}>
        <div className="form-format">
          <button className="button">+</button>
          <input
            type="text"
            placeholder="New Todo Item"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
      </form>
      <form></form>
    </div>
  );
}

function DisplayToDo({ todo, deleteTodo, handleToggle }) {
  /*const [sortBy, setSortBy] = useState("NtO");

  let sorted;

  if (sortBy === "NtO") sorted = todo;

  if (sortBy === "AtZ")
    sorted = todo.slice().sort((a, b) => a.title.localeCompare(b.title));

  if (sortBy === "packed")
    sorted = todo
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed)); */
  return (
    <div className="todo-list">
      {/*<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="NtO">Sort by Newest to Oldest</option>
        <option value="OtN">Sort by Oldest to Newest</option>
        <option value="AtZ">Sort by A-Z</option>
        <option value="ZtA">Sort by Z-A</option>
        <option value="completed">Sort by Completed</option>
        <option value="incompleted">Sort by Incompleted</option>
  </select> */}
      {todo.map((title) => (
        <Todo
          title={title}
          key={title.id}
          deleteTodo={deleteTodo}
          handleToggle={handleToggle}
        />
      ))}
    </div>
  );
}

function Todo({ title, handleToggle, deleteTodo }) {
  return (
    <div className="todo-item">
      <input type="checkbox" onInput={() => handleToggle(title.id)} />
      <h3
        style={
          title.completed
            ? { textDecoration: "line-through", color: "grey" }
            : {}
        }
      >
        {title.title}
      </h3>
      <button className="delete-button" onClick={() => deleteTodo(title.id)}>
        ❌
      </button>
    </div>
  );
}
