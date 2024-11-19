import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import trash from "./assets/trash.png"; 
import AutumnBucket from "./assets/autumnbucket.png";
import SummerBucket from "./assets/summerbucket.png";
import SpringBucket from "./assets/springbucket.png";
import { HomeType } from "./types";
import { premadeLists } from "./component/BucketList";

function Home({ lists, setLists, tasks, setTasks }: HomeType) {
    const [newListName, setNewListName] = useState("");
    const [createdPremadeLists, setCreatedPremadeLists] = useState<string[]>(() => {
        const saved = localStorage.getItem('createdPremadeLists');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('createdPremadeLists', JSON.stringify(createdPremadeLists));
    }, [createdPremadeLists]);

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
        const listName = lists[index];
        const updatedLists = lists.filter((_, i) => i !== index).sort();
        setLists(updatedLists);

        // Hvis listen slettes, skal den også fjernes fra tasks
        const updatedTasks = { ...tasks };
        delete updatedTasks[lists[index]]; // Fjern tasks for den slettede liste
        setTasks(updatedTasks);

        setCreatedPremadeLists((prev) => prev.filter((name) => name !== listName));
    };

    const countCompletedTasks = (listName: string) => {
        return tasks[listName]?.filter((task: any) => task.completed).length || 0;
    };

    const handleShowPremadeList = (listName: string) => {
        if (createdPremadeLists.includes(listName)) {
            alert(`You already have a ${listName}`);
            return;
        }

        const list = premadeLists.find((list) => list.name === listName);
        if (list && !lists.includes(list.name)) {
            setLists((prevLists) => [...prevLists, list.name].sort());
            setTasks((prevTasks) => ({ ...prevTasks, [list.name]: list.tasks }));
            setCreatedPremadeLists((prev) => [...prev, listName]);
        }
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

            {lists.length === 0 ? (
                <p className="no-tasks-text">No lists created yet. Start by adding a new list.</p>
            ) : (

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
            )}

            <div className="reveal-premade-lists">
                <img 
                    src={AutumnBucket} 
                    alt="Reveal Autumn Bucket List" 
                    onClick={() => handleShowPremadeList('Autumn Bucket List')} 
                    className={`reveal-image ${createdPremadeLists.includes('Autumn Bucket List') ? 'faded' : ''}`}
                />
                <img 
                    src={SummerBucket} 
                    alt="Reveal Summer Bucket List" 
                    onClick={() => handleShowPremadeList('Summer Bucket List')} 
                    className={`reveal-image ${createdPremadeLists.includes('Summer Bucket List') ? 'faded' : ''}`}
                />
                <img 
                    src={SpringBucket} 
                    alt="Reveal Spring Bucket List" 
                    onClick={() => handleShowPremadeList('Spring Bucket List')} 
                    className={`reveal-image ${createdPremadeLists.includes('Spring Bucket List') ? 'faded' : ''}`}
                />
            </div>
        </div>
    );
}

export default Home;