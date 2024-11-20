import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';
import arrow from './assets/arrow.png';
import { RouteParams, HomeType } from "./types";
import Confirm from "./component/Confirm";

const ListPage: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    const listName = id ? lists[parseInt(id)] : "defaultListName";
    const listTasks = tasks[listName] || [];

    const [filter, setFilter] = useState<string>("all");
    const [expandedTaskIndex, setExpandedTaskIndex] = useState<number | null>(null);

    // State til Confirm-komponenten
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    const handleCompleteTask = (index: number) => {
        const updatedTasks = listTasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );

        updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));
        setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));
    };

    const confirmDeleteTask = (index: number) => {
        setTaskToDelete(index);
        setShowConfirm(true);
    };

    const handleDeleteTask = () => {
        if (taskToDelete === null) return;

        const updatedTasks = listTasks.filter((_, taskIndex) => taskIndex !== taskToDelete);
        setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));

        setShowConfirm(false);
        setTaskToDelete(null);
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
            <button 
                id="back-button"
                onClick={() => navigate('/')} 
                className="back-button"
            >
                <img src={arrow} alt="back to lists" /> 
                Lists
            </button>

            <h1>{listName}</h1>

            <div className="actions">
                <Link to={`/newtask?list=${listName}`}>
                    <button 
                        id="add-task"
                        className="add-task">Add task +
                    </button>
                </Link>

                <label htmlFor="filter-select">Filter tasks by:</label>

                <select
                    id="filter-select"
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

                            <label htmlFor="task-checkbox">Task:</label>
                            <input
                                id="task-checkbox"
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
                                    id="see-more"
                                    className="see-more"
                                    onClick={() =>
                                        setExpandedTaskIndex(expandedTaskIndex === index ? null : index)
                                    }
                                >
                                    {expandedTaskIndex === index ? "See Less" : "See More"}
                                </button>
                            )}

                            <div className="task-actions">
                                <button 
                                    id="edit-task"
                                    onClick={() => handleEditTask(index)}
                                >
                                    <img src={edit} alt="edit task" />
                                </button>
                                
                                <button 
                                    id="delete-task"
                                    onClick={() => confirmDeleteTask(index)}
                                >
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

            {showConfirm && (
                <Confirm
                    message={`Are you sure you want to delete this task?`}
                    onConfirm={handleDeleteTask}
                    onCancel={() => {
                        setShowConfirm(false);
                        setTaskToDelete(null);
                    }}
                />
            )}
        </div>
    );
};

export default ListPage;
