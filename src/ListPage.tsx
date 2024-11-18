import React from "react";
import { Link, useParams } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';
import { RouteParams, HomeType } from "./types";

function ListPage({ lists, tasks, setTasks }: HomeType) {
    const { id } = useParams<RouteParams>();
    const listName = id ? lists[id] : "defaultListName";
    const listTasks = tasks[listName] || [];

    const handleCompleteTask = (index: number) => {
        const updatedTasks = listTasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );

        updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));

        setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));
    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = listTasks.filter((_, taskIndex) => taskIndex !== index);
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
                            {/* Checkbox til 'completed' */}
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCompleteTask(index)}
                                className="task-checkbox"
                            />

                            {/* Opgave navn */}
                            <span className={`task-name ${task.completed ? "completed" : ""}`}>
                                {task.name} - {task.priority}
                            </span>

                            {/* Handling af redigering/sletning */}
                            <div className="task-actions">
                                <button onClick={() => console.log(`Edit task ${index}`)}>
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
