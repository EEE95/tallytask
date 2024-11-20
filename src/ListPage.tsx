import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';
import arrow from './assets/arrow.png'
import { RouteParams, HomeType, Task } from "./types";

const ListPage: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    const listName = id ? lists[parseInt(id)] : "defaultListName";
    const listTasks = tasks[listName] || [];

    const [filter, setFilter] = useState<string>("all");
    const [expandedTaskIndex, setExpandedTaskIndex] = useState<number | null>(null);

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

    const handleEditTask = (index: number) => {
        const taskToEdit = listTasks[index];
        navigate(`/newtask?list=${listName}&edit=true&index=${index}`, {
            state: { task: taskToEdit },
        });
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
            <button onClick={() => navigate('/')} className="back-button">
                <img src={arrow} alt="back to lists" /> Lists
            </button>
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
                            <div className={`priority-dot ${task.priority}`}></div>

                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCompleteTask(index)}
                                className="task-checkbox"
                            />
                            
                            <span className={`task-name ${task.completed ? "completed" : ""}`}>
                                {task.name}
                            </span>

                            {task.description && (
                                <button
                                    className="see-more"
                                    onClick={() =>
                                        setExpandedTaskIndex(expandedTaskIndex === index ? null : index)
                                    }
                                >
                                    {expandedTaskIndex === index ? "See Less" : "See More"}
                                </button>
                            )}

                                        
                            <div className="task-actions">
                                <button onClick={() => handleEditTask(index)}>
                                    <img src={edit} alt="edit task" />
                                </button>
                                <button onClick={() => handleDeleteTask(index)}>
                                    <img src={trash} alt="delete task" />
                                </button>
                            </div>
                        </div>

                        {expandedTaskIndex === index && task.description && (
                            <div className="description-text">
                                <p>{task.description}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPage;
