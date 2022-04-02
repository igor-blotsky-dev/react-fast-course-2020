import React, {useState} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";

function App() {
  const [todos, setTodos] = useState([
    {id: 1, completed: false, title: "Buy bread"},
    {id: 2, completed: true, title: "Buy butter"},
    {id: 3, completed: true, title: "Buy cola"},
  ]);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {...todo, completed: !todo.completed};
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <Context.Provider value={{toggleTodo, removeTodo}}>
      <div className="wrapper">
        <h1>React tutorial</h1>

        <TodoList todos={todos}/>
      </div>
    </Context.Provider>
  );
}

export default App;
