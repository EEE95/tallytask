import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './Home';
import ListPage from './ListPage';
import NewTask from './component/NewTask';
import Personalize from './component/Personalize';

function App() {
    const savedNickname = localStorage.getItem('nickname') || 'Tallybuddy';
    const [nickname, setNickname] = useState(savedNickname);
    const [lists, setLists] = useState([]); 
    const [tasks, setTasks] = useState({});
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nickname]);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('selectedAvatar');
        if (savedAvatar) {
            setSelectedAvatar(savedAvatar);
        }
    }, []);
    
    useEffect(() => {
        if (selectedAvatar) {
            localStorage.setItem('selectedAvatar', selectedAvatar);
        }
    }, [selectedAvatar]);
    

    return (
      <Router>
          <div className="App">
              <Header nickname={nickname} selectedAvatar={selectedAvatar}  />
              <Routes>
                  <Route 
                    path="/" 
                    element={<Home lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />} 
                  />
                  <Route 
                    path="/list/:id" 
                    element={<ListPage lists={lists} tasks={tasks} setTasks={setTasks} />} 
                  />
                  <Route 
                      path="/newtask" 
                      element={<NewTask lists={lists} tasks={tasks} setTasks={setTasks} />} 
                  />
                  <Route 
                      path="/personalize" 
                      element={<Personalize setNickname={setNickname} setSelectedAvatar={setSelectedAvatar} />} 
                  />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
