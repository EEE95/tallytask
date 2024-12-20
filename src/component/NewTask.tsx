import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeType } from "../types";

// Component to create or edit a task
const NewTask: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const location = useLocation(); // Hook to access the current route's state and query parameters

    // Extracting query parameters for list name, edit mode, and task index
    const listFromQuery = new URLSearchParams(location.search).get("list");
    const editMode = new URLSearchParams(location.search).get("edit") === "true";
    const taskIndex = parseInt(new URLSearchParams(location.search).get("index") || "-1", 10);

    // State variables for managing form inputs and error messages
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [selectedList, setSelectedList] = useState(listFromQuery || "");
    const [error, setError] = useState("");

    // If in edit mode, retrieve task details
    React.useEffect(() => {
        if (editMode && location.state?.task) {
            const { name, description, priority } = location.state.task;
            setTask(name);
            setDescription(description || "");
            setPriority(priority || "");
        }
    }, [editMode, location.state]);

    // Handles saving a new task or updating an existing one
    const handleSaveTask = () => {
        // Validation, list selected and task name is required  
        if (!selectedList) {
            setError("Please select a list.");
            return;
        }
        if (!task.trim()) {
            setError("Please enter a task name.");
            return;
        }

        // Construct the task object
        const updatedTask = {
            name: task.trim(),
            description: description.trim(),
            priority,
            completed: editMode ? location.state.task.completed : false,
        };

        const updatedTasks = { ...tasks };
        // Ensure the selected list exists in the tasks object
        if (!updatedTasks[selectedList]) {
            updatedTasks[selectedList] = [];
        }

        // Update the task if in edit mode otherwise, add a new task
        if (editMode && taskIndex >= 0) {
            updatedTasks[selectedList][taskIndex] = updatedTask;
        } else {
            updatedTasks[selectedList] = [
                updatedTask,
                ...updatedTasks[selectedList].filter((t) => !t.completed),
                ...updatedTasks[selectedList].filter((t) => t.completed),
            ];
        }

        // Update the tasks in state
        setTasks(updatedTasks);
        // Navigate back to the previous page
        navigate(-1);
    };

    return (
        <div className="new-task">
            {/* Header changes based on mode (edit or create) */}
            <h1>{editMode ? "Edit Task" : "New Task"}</h1>

            <div>
                {/* Dropdown to select a list */}
                <label htmlFor="list-select">Select a list:</label>
                <select
                    id="list-select"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                    disabled={editMode}
                >
                    <option value="">Lists</option>
                    {lists.map((list, index) => (
                        <option key={index} value={list}>
                            {list}
                        </option>
                    ))}
                </select>
            </div>

            {/* Input for task name and optional description */}
            <div>
                <label htmlFor="task-input">Task:</label>
                <input
                    id="task-input"
                    type="text"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <label htmlFor="description-textarea">Description (optional):</label>
                <textarea
                    id="description-textarea"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Dropdown to select task priority */}
            <div className="priority-container">
                <label htmlFor="priority-select">Select priority (optional)</label>
                <select
                    id="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">-- Select priority (optional) --</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            {/* Display error messages if validation fails */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button 
                id="save-task-button"
                onClick={handleSaveTask}
                aria-label={editMode ? "Save changes to the task" : "Create a new task"}
            >

                {editMode ? "Save Changes" : "Create"}
            </button>
        </div>
    );
};

export default NewTask;
