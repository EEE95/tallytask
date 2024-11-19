import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeType } from '../types';

function NewTask({ lists, tasks, setTasks }: HomeType) {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState(""); 
    const [priority, setPriority] = useState(""); 
    const [selectedList, setSelectedList] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();
    const location = useLocation();

    const listFromQuery = new URLSearchParams(location.search).get("list");

    React.useEffect(() => {
        if (listFromQuery) {
            setSelectedList(listFromQuery);
        }
    }, [listFromQuery]);

    const handleCreateTask = () => {
        if (!selectedList) {
            setError("Please select a list.");
            return;
        }
        if (!task.trim()) {
            setError("Please enter a task name.");
            return;
        }
    
        const newTask = {
            name: task.trim(),
            description: description.trim(),
            priority,
            completed: false, 
        };
    
        const updatedTasks = { ...tasks };
    
        if (!updatedTasks[selectedList]) {
            updatedTasks[selectedList] = [];
        }
    
        updatedTasks[selectedList] = [newTask, ...updatedTasks[selectedList].filter(t => !t.completed), ...updatedTasks[selectedList].filter(t => t.completed)];
    
        setTasks(updatedTasks);
    
        setError("");
        navigate(-1);
    };
    

    return (
        <div className="new-task">
            <h2>New task</h2>

            <div>
                <label htmlFor="list-select"></label>
                <select
                    id="list-select"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
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
                <input
                    type="text"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="priority-container">
                <label htmlFor="priority-select"></label>
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

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleCreateTask}>Create</button>
        </div>
    );
}

export default NewTask;
