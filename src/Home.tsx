import React, { useState } from "react";
import { Link } from "react-router-dom";
import trash from "./assets/trash.png"; 

function Home({ lists, setLists, tasks, setTasks }) {
    const [newListName, setNewListName] = useState("");

    const handleCreateList = () => {
        if (newListName.trim()) {
            // Opretter en ny liste og tilføjer den til 'lists'
            const updatedLists = [...lists, newListName.trim()];
            setLists(updatedLists);
            
            // Opretter en tom task array for den nye liste i 'tasks'
            const updatedTasks = { ...tasks, [newListName.trim()]: [] };
            setTasks(updatedTasks);

            // Nulstiller inputfeltet for liste-navn
            setNewListName("");
        }
    };

    const handleDeleteList = (index) => {
        const updatedLists = lists.filter((_, i) => i !== index);
        setLists(updatedLists);

        // Hvis listen slettes, skal den også fjernes fra tasks
        const updatedTasks = { ...tasks };
        delete updatedTasks[lists[index]]; // Fjern tasks for den slettede liste
        setTasks(updatedTasks);
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
                />
                <button onClick={handleCreateList}> + </button>
            </div>

            <ul>
                {lists.map((list, index) => (
                    <li key={index} className="list-item">
                        <Link to={`/list/${index}`} className="list-link">
                            {list}
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
