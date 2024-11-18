import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';
import { RouteParams, HomeType, Task } from "./types";
import '../src/css/elisabeth.css';

const ListPage: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    const { id } = useParams<RouteParams>();
    const listName = id ? lists[id] : "defaultListName";
    const listTasks = tasks[listName] || [];

    const [filter, setFilter] = useState<string>("all"); 

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

    const filteredTasks = listTasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "notCompleted") return !task.completed;
        if (filter === "highPriority") return task.priority === "high";
        if (filter === "mediumPriority") return task.priority === "medium";
        if (filter === "lowPriority") return task.priority === "low";
        return true;
    });

    return (
        <div className="list-page">
            <h2>{listName}</h2>

            <div className="actions">
                <Link to={`/newtask?list=${listName}`}>
                    <button className="add-task">Add task +</button>
                </Link>
                
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Filter</option>
                    <option value="completed">Completed</option>
                    <option value="notCompleted">Not Completed</option>
                    <option value="highPriority">High Priority</option>
                    <option value="mediumPriority">Medium Priority</option>
                    <option value="lowPriority">Low Priority</option>
                </select>
            </div>

            <ul>
                {filteredTasks.map((task, index) => (
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
                                {task.name}
                            </span>
                            <div className={`priority-dot ${task.priority}`}></div>
                            
                            {/* Redigering/sletning */}
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
