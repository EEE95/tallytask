import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeType } from "../types";

const NewTask: React.FC<HomeType> = ({ lists, tasks, setTasks }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const listFromQuery = new URLSearchParams(location.search).get("list");
    const editMode = new URLSearchParams(location.search).get("edit") === "true";
    const taskIndex = parseInt(new URLSearchParams(location.search).get("index") || "-1", 10);

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [selectedList, setSelectedList] = useState(listFromQuery || "");
    const [error, setError] = useState("");

    React.useEffect(() => {
        if (editMode && location.state?.task) {
            const { name, description, priority } = location.state.task;
            setTask(name);
            setDescription(description || "");
            setPriority(priority || "");
        }
    }, [editMode, location.state]);

    const handleSaveTask = () => {
        if (!selectedList) {
            setError("Please select a list.");
            return;
        }
        if (!task.trim()) {
            setError("Please enter a task name.");
            return;
        }

        const updatedTask = {
            name: task.trim(),
            description: description.trim(),
            priority,
            completed: editMode ? location.state.task.completed : false,
        };

        const updatedTasks = { ...tasks };
        if (!updatedTasks[selectedList]) {
            updatedTasks[selectedList] = [];
        }

        if (editMode && taskIndex >= 0) {
            updatedTasks[selectedList][taskIndex] = updatedTask;
        } else {
            updatedTasks[selectedList] = [
                updatedTask,
                ...updatedTasks[selectedList].filter((t) => !t.completed),
                ...updatedTasks[selectedList].filter((t) => t.completed),
            ];
        }

        setTasks(updatedTasks);
        navigate(-1);
    };

    return (
        <div className="new-task">
            <h1>{editMode ? "Edit Task" : "New Task"}</h1>

            <div>
                <label htmlFor="list-select"></label>
                <select
                    id="list-select"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                    disabled={editMode}
                    aria-label="Select a list"
                >
                    <option value="">Lists</option>
                    {lists.map((list, index) => (
                        <option key={index} value={list}>
                            {list}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="task-input">Task:</label>
                <input
                    id="task-input"
                    type="text"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    aria-label="Task"
                />
                <label htmlFor="description-textarea">Description (optional):</label>
                <textarea
                    id="description-textarea"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-label="Description (optional)"
                />
            </div>

            <div className="priority-container">
                <label htmlFor="priority-select"></label>
                <select
                    id="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    aria-label="Select priority (optional)"
                >
                    <option value="">-- Select priority (optional) --</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

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
