import React, { useState } from "react";
import { Link } from "react-router-dom";
import trash from "./assets/trash.png"; 
import { HomeType } from "./types";

function Home({ lists, setLists, tasks, setTasks }: HomeType) {
    const [newListName, setNewListName] = useState("");

    const handleCreateList = () => {
        if (newListName.trim()) {
            // Opretter en ny liste og tilføjer den til 'lists'
            const updatedLists = [...lists, newListName.trim()].sort();
            setLists(updatedLists);
            
            // Opretter en tom task array for den nye liste i 'tasks'
            const updatedTasks = { ...tasks, [newListName.trim()]: [] };
            setTasks(updatedTasks);

            // Nulstiller inputfeltet for liste-navn
            setNewListName("");
        }
    };

    const handleDeleteList = (index:number) => {
        const updatedLists = lists.filter((_, i) => i !== index).sort();
        setLists(updatedLists);

        // Hvis listen slettes, skal den også fjernes fra tasks
        const updatedTasks = { ...tasks };
        delete updatedTasks[lists[index]]; // Fjern tasks for den slettede liste
        setTasks(updatedTasks);
    };

    const countCompletedTasks = (listName: string) => {
        return tasks[listName]?.filter((task: any) => task.completed).length || 0;
    };

    return (
        <div className="home-page">
            <h2>To do lists</h2>
            <div className="create-list">
                <input
                    type="text"
                    placeholder="New list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key ==="Enter") {
                            handleCreateList();
                        }
                    }}
                />
                <button onClick={handleCreateList} type="submit"> + </button>
            </div>

            <ul>
                {lists.map((list, index) => (
                    <li key={index} className="list-item">
                        <Link to={`/list/${index}`} className="list-link">
                            {list} 
                            <span className="task-count">
                                ({countCompletedTasks(list)}/{tasks[list]?.length || 0})
                            </span>
                        </Link>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteList(index)}
                        >
                            <img src={trash} alt="Delete" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;