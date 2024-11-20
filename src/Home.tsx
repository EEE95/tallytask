import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import trash from "./assets/trash.png"; 
import AutumnBucket from "./assets/autumnbucket.png";
import SummerBucket from "./assets/summerbucket.png";
import SpringBucket from "./assets/springbucket.png";
import { HomeType, PremadeList } from "./types";
import { premadeLists } from "./component/Bucketlist";
import Confirm from "./component/Confirm";
import Nocreate from "./component/Nocreate";


const Home: React.FC<HomeType> = ({ lists, setLists, tasks, setTasks }) => {
    const [newListName, setNewListName] = useState("");
    const [createdPremadeLists, setCreatedPremadeLists] = useState<string[]>(() => {
        const saved = localStorage.getItem('createdPremadeLists');
        return saved ? JSON.parse(saved) : [];
    });

    const [showNocreate, setShowNocreate] = useState<boolean>(false);
    const [nocreateMessage, setNocreateMessage] = useState<string>("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [listToDelete, setListToDelete] = useState<number | null>(null);

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

    const confirmDeleteList = (index: number) => {
        setListToDelete(index);
        setShowConfirm(true);
    };

    const handleDeleteList = () => {
        if (listToDelete === null) return;

        const listName = lists[listToDelete];
        const updatedLists = lists.filter((_, i) => i !== listToDelete).sort();
        setLists(updatedLists);

        const updatedTasks = { ...tasks };
        delete updatedTasks[listName];
        setTasks(updatedTasks);

        setCreatedPremadeLists((prev) => prev.filter((name) => name !== listName));

        setShowConfirm(false);
        setListToDelete(null);
    };

    const countCompletedTasks = (listName: string): number => {
        return tasks[listName]?.filter((task: any) => task.completed).length || 0;
    };

    const handleShowPremadeList = (listName: string) => {
        if (createdPremadeLists.includes(listName)) {
            setNocreateMessage(`..the ${listName} is already created!`);
            setShowNocreate(true);
            return;
        }

        const list = premadeLists.find((list) => list.name === listName);
        if (list && !lists.includes(list.name)) {
            const updatedLists = [...lists, list.name].sort();
            setLists(updatedLists);
            setTasks((prevTasks) => ({ ...prevTasks, [list.name]: list.tasks }));
            setCreatedPremadeLists((prev) => [...prev, listName]);
        }
    };

    return (
        <div className="home-page">
            <h1>To do lists</h1>
            <div className="create-list">
                <label htmlFor="new-list">New list name</label>
                <input
                    id="new-list"
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
                <button 
                    id="create-list-button"
                    aria-label="Create list"
                    onClick={handleCreateList} 
                    type="submit"
                    > + 
                </button>
            </div>

            {lists.length === 0 ? (
                <p className="no-tasks-text">
                    No lists created yet. Start by adding a new list or pick one of the Bucketlists below!
                </p>
            ) : (

                <ul>
                {lists.map((list, index) => (
                    <li key={index} className="list-item">
                        <Link
                            to={`/list/${index}`}
                            className="list-link"
                            aria-label={`View tasks in ${list}`}
                        >
                            {list}
                            <span className="task-count">
                                ({countCompletedTasks(list)}/{tasks[list]?.length || 0})
                            </span>
                        </Link>
                        <button
                            id="delete-list-button"
                            aria-label={`Delete ${list} list`}
                            className="delete-button"
                            onClick={() => confirmDeleteList(index)}
                        >
                            <img src={trash} alt="Delete" />
                        </button>
                    </li>
                ))}
                </ul>
            )}

            {showConfirm && (
                <Confirm
                    message={`Are you sure you want to delete the list "${lists[listToDelete || 0]}"?`}
                    onConfirm={handleDeleteList}
                    onCancel={() => {
                        setShowConfirm(false);
                        setListToDelete(null);
                    }}
                />
            )}

            <h2 className="bucketlist-overskrift" >Premade bucketlists for you</h2>
            <div className="reveal-premade-lists">
                <img 
                    id="autumn-bucketlist"
                    src={AutumnBucket} 
                    alt="Reveal Autumn Bucketlist" 
                    onClick={() => handleShowPremadeList('Autumn Bucketlist')} 
                    className={`reveal-image ${createdPremadeLists.includes('Autumn Bucketlist') ? 'faded' : ''}`}
                />
                <img 
                    id="summer-bucketlist"
                    src={SummerBucket} 
                    alt="Reveal Summer Bucketlist" 
                    onClick={() => handleShowPremadeList('Summer Bucketlist')} 
                    className={`reveal-image ${createdPremadeLists.includes('Summer Bucketlist') ? 'faded' : ''}`}
                />
                <img 
                    id="spring-bucketlist"
                    src={SpringBucket} 
                    alt="Reveal Spring Bucketlist" 
                    onClick={() => handleShowPremadeList('Spring Bucketlist')} 
                    className={`reveal-image ${createdPremadeLists.includes('Spring Bucketlist') ? 'faded' : ''}`}
                />
            </div>

            <Nocreate show={showNocreate} onClose={() => setShowNocreate(false)} message={nocreateMessage} />
        </div>
    );
}

export default Home;

function setListToDelete(index: number) {
    throw new Error("Function not implemented.");
}
function setShowConfirm(arg0: boolean) {
    throw new Error("Function not implemented.");
}

