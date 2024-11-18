import React from "react";
import { Link, useParams } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';

function ListPage({ lists, tasks, setTasks }) {
    const { id } = useParams();
    const listName = lists[id];
    const listTasks = tasks[listName] || []; 

const handleCompleteTask = (index) => {
    const updatedTasks = [...listTasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));
};

    return (
        <div className="list-page">
            <h2>{listName}</h2>

            <Link to={`/newtask?list=${listName}`}>
                <button>Add task</button>
            </Link>

            <ul>
                {listTasks.map((task, index) => (
                    <li key={index} className={`task-item priority-${task.priority}`}>
                        <div className="task-content">
                            
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCompleteTask(index)}
                                className="task-checkbox"
                            />

                            <span className={`task-name ${task.completed ? "completed" : ""}`}>
                                {task.name} - {task.priority}
                            </span>

                            <div className="task-actions">
                                <button onClick={() => handleEditTask(index)}>
                                    <img src={edit} alt="edit task" />
                                </button>
                                <button onClick={() => handleDeleteTask(index)}>
                                    <img src={trash} alt="delete task" />
                                </button>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPage;