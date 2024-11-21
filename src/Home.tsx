import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import trash from "./assets/trash.png"; 
import AutumnBucket from "./assets/autumnbucket.png";
import SummerBucket from "./assets/summerbucket.png";
import SpringBucket from "./assets/springbucket.png";
import { HomeType, PremadeList } from "./types";
import { premadeLists } from "./component/BucketList";
import Confirm from "./component/Confirm";
import Nocreate from "./component/Nocreate";

// Defines the Home functional component, accepting props defined by HomeType
const Home: React.FC<HomeType> = ({ lists, setLists, tasks, setTasks }) => {
    // The useState hook is used to declare a new state variable, newListName, and a function to update it, setNewListName
    const [newListName, setNewListName] = useState("");

     // State to track which premade bucket lists have been created, loaded from localStorage
    const [createdPremadeLists, setCreatedPremadeLists] = useState<string[]>(() => {
        const saved = localStorage.getItem('createdPremadeLists');
        // Parse saved lists or initialize as empty array
        return saved ? JSON.parse(saved) : []; 
    });

     // State for controlling the "no-create" modal visibility and its message
    const [showNocreate, setShowNocreate] = useState<boolean>(false);
    const [nocreateMessage, setNocreateMessage] = useState<string>("");

    // State for controlling the confirmation modal for deleting lists
    const [showConfirm, setShowConfirm] = useState(false);
    const [listToDelete, setListToDelete] = useState<number | null>(null);

    // Sync the `createdPremadeLists` state with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('createdPremadeLists', JSON.stringify(createdPremadeLists));
    }, [createdPremadeLists]);

    // Function to create a new list
    const handleCreateList = () => {
        // Ensure the input is not empty
        if (newListName.trim()) {
            // Add the new list and sort
            const updatedLists = [...lists, newListName.trim()].sort();
            setLists(updatedLists);
            
            // Initialize an empty task array for the new list
            const updatedTasks = { ...tasks, [newListName.trim()]: [] };
            setTasks(updatedTasks);

            // Clear the input field
            setNewListName("");
        }
    };

    // Prepare to delete a list and show the confirmation modal
    const confirmDeleteList = (index: number) => {
        setListToDelete(index);
        setShowConfirm(true);
    };

    // Function to handle actual deletion of a list
    const handleDeleteList = () => {
        if (listToDelete === null) return;

        // Get the name of the list to delete
        const listName = lists[listToDelete];
        // Remove the list and sort
        const updatedLists = lists.filter((_, i) => i !== listToDelete).sort();
        setLists(updatedLists);

         // Remove the associated tasks for the list
        const updatedTasks = { ...tasks };
        delete updatedTasks[listName];
        setTasks(updatedTasks);

        // Remove the list from the premade lists if it was a premade one
        setCreatedPremadeLists((prev) => prev.filter((name) => name !== listName));

        // Close the confirmation modal
        setShowConfirm(false);
        setListToDelete(null);
    };

    // Helper function to count completed tasks for a specific list
    const countCompletedTasks = (listName: string): number => {
        return tasks[listName]?.filter((task: any) => task.completed).length || 0;
    };

    // Function to reveal a premade bucket list
    const handleShowPremadeList = (listName: string) => {
        if (createdPremadeLists.includes(listName)) {
            // Show a warning if already created
            setNocreateMessage(`..the ${listName} is already created!`);
            setShowNocreate(true);
            return;
        }

        // Find the premade list by name
        const list = premadeLists.find((list) => list.name === listName);
        // Add the list if it hasn't already been added
        if (list && !lists.includes(list.name)) {
            const updatedLists = [...lists, list.name].sort();
            setLists(updatedLists);
            // Add premade tasks to the list
            setTasks((prevTasks) => ({ ...prevTasks, [list.name]: list.tasks }));
            // Track it in the state 
            setCreatedPremadeLists((prev) => [...prev, listName]);
        }
    };

    return (
        <div className="home-page">
            <h1>To do lists</h1>
            <div className="create-list">
                <label htmlFor="new-list">New list name</label>
                {/* Input field for creating a new list */}
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
                {/* Button to create a new list */}
                <button 
                    id="create-list-button"
                    aria-label="Create list"
                    onClick={handleCreateList} 
                    type="submit"
                    > + 
                </button>
            </div>

             {/* Display a message if there is no lists */}       
            {lists.length === 0 ? (
                <p className="no-tasks-text">
                    No lists created yet. Start by adding a new list or pick one of the Bucketlists below!
                </p>
            ) : (

                <ul>
                {/* Display each list with a link to view its tasks and a delete button */}
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
    
            {/* Display the confirmation modal for deleting lists */}
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

            {/* Display the premade bucketlists */}
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
                
            {/* Display the "no-create" modal when a list has already been made */}
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

