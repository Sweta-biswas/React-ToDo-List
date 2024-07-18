import './App.css';
import { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  let [todolist, setTodolist] = useState([]);

  let saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value;

    if (!todolist.some(item => item.name === toname)) {
      let finaldolist = [...todolist, { name: toname, completed: false }];
      setTodolist(finaldolist);
    } else {
      showNotification();
    }
  };

  let showNotification = () => {
    NotificationManager.warning('ToDo name already exists..');
  };

  let toggleStatus = (index) => {
    let updatedList = [...todolist];
    updatedList[index].completed = !updatedList[index].completed;
    setTodolist(updatedList);
  };

  let deleteRow = (index) => {
    let updatedList = todolist.filter((_, i) => i !== index);
    setTodolist(updatedList);
  };

  let list = todolist.map((item, index) => {
    return (
      <ToDoListItems
        key={index}
        indexNumber={index}
        item={item}
        toggleStatus={toggleStatus}
        deleteRow={deleteRow}
      />
    );
  });

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button type="submit">Save</button>
        <NotificationContainer />
      </form>

      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ item, indexNumber, toggleStatus, deleteRow }) {
  return (
    <li className={item.completed ? 'completetodo' : ''} onClick={() => toggleStatus(indexNumber)}>
      {indexNumber + 1} {item.name} <span onClick={(e) => { e.stopPropagation(); deleteRow(indexNumber); }}>&times;</span>
    </li>
  );
}
