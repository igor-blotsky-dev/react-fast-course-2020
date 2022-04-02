import React, {useState, useEffect} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5 ')
      .then(response => response.json())
      .then(todos => setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      }, 3000))
  }, [])

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

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{toggleTodo, removeTodo}}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <AddTodo onCreate={addTodo}/>
        {
          loading
            ? <Loader/>
            : todos.length
              ? <TodoList todos={todos}/>
              : <p>no todos</p>
        }


      </div>
    </Context.Provider>
  );
}

export default App;
