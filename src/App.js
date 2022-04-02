import React, {lazy, useEffect, useState} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import("./Todo/AddTodo"))
  }, 4000)
}))

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

        <Modal/>
 
        <React.Suspense fallback={<Loader/>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>


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
