import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode,setEditMode] = useState(false);
  const [editableTodo,setEditabelTodo] =useState(null);

  const createTodoHandler = () => {
    if (todoTitle != '') {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        isComplete: false
      };
      setTodoList([...todoList, newTodo]);
      setTodoTitle("");
    } else {
      alert("Please Enter A Valid Title")
    }
  }
  const editTodoHandler = (id) =>{
    const todoToBeEdited = todoList.find((item => item.id === id));
    setEditMode(true);
    setEditabelTodo(todoToBeEdited);
    setTodoTitle(todoToBeEdited.title);
  }
  const updateTodoHandler = () => {
    setTodoList(todoList.map((todo) => {
      if(todo.id == editableTodo.id){
        todo.title = todoTitle
      }
      return todo;
    }))
    setEditMode(false);
    setTodoTitle("");
    setEditabelTodo(null);
  }
  const deleteTodoHandler = (id) =>{
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <h2>Todo App</h2>
      <div className="todoApp">
        <input type="text" value={todoTitle} onChange={(event) => setTodoTitle(event.target.value)} />
        <button onClick= {() => {
          editMode ? updateTodoHandler() : createTodoHandler()
        }}>
          {editMode ? "Update" : "Add Todo"}
        </button>
        <ul className="todoList">
        {todoList.map(todo =>(
            <li>
              <span>
                {todo.title}
              </span>
              <button onClick={() => editTodoHandler(todo.id)}>
                Edit
              </button>
              <button onClick={() => deleteTodoHandler(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
