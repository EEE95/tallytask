import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import trash from './assets/trash.png';
import edit from './assets/edit.png';
import arrow from './assets/arrow.png';
import { RouteParams, HomeType } from "./types";
import Confirm from "./component/Confirm";

const ListPage: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    //Get the list ID to identify the current list
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    // Determine the list name or use a default 
    const listName = id ? lists[parseInt(id)] : "defaultListName";
    
    // Get the task assoiated whit the current list
    const listTasks = tasks[listName] || [];

    // State for filering tasks
    const [filter, setFilter] = useState<string>("all");
    
    // State to track which tasks have a description 
    const [expandedTaskIndex, setExpandedTaskIndex] = useState<number | null>(null);

    // State til Confirm-komponenten
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    // Toggels the completion status of a task
    const handleCompleteTask = (index: number) => {
        const updatedTasks = listTasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );

        // Completed tasks appear at the bottom
        updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));
        setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));
    };

    // Opens confirm to verify if you want to delete a task
    const confirmDeleteTask = (index: number) => {
        setTaskToDelete(index);
        setShowConfirm(true);
    };

    // Deletes task and closes confirm
    const handleDeleteTask = () => {
        if (taskToDelete === null) return;

        const updatedTasks = listTasks.filter((_, taskIndex) => taskIndex !== taskToDelete);
        setTasks((prev) => ({ ...prev, [listName]: updatedTasks }));

        setShowConfirm(false);
        setTaskToDelete(null);
    };

    // Navigates a task to edit page 
    const handleEditTask = (index: number) => {
        const taskToEdit = listTasks[index];
        navigate(`/newtask?list=${listName}&edit=true&index=${index}`, {
            state: { task: taskToEdit },
        });
    };

    // Filters task
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
            {/* Back button to navigate to homepage */}
            <button 
                id="back-button"
                onClick={() => navigate('/')} 
                className="back-button"
            >
                <img src={arrow} alt="back to lists" /> 
                Lists

            </button>

            {/* Displays name of current list */}
            <h1>{listName}</h1>

            {/* add a new task to current list */}
            <div className="actions">
                <Link to={`/newtask?list=${listName}`}>
                    <button 
                        id="add-task"
                        className="add-task">Add task +
                    </button>
                </Link>

                {/* Dropdown menu - filter tasks */}
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
                            
                            {/* indicating the task's priority */}
                            <div className={`priority-dot ${task.priority}`}></div>

                            {/* Checkbox to toggle a task's completion status */}
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

                            {/* Button to see more details */}
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

                            {/* Editing and deleting a task */}
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
                        
                        {/* Extra details about the task are shown if there are any */}
                        {expandedTaskIndex === index && task.description && (
                            <div className="description-text">
                                <p>{task.description}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            
            {/* Confirm to verify task deletion */}
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
