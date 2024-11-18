import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './Home';
import ListPage from './Listpage';
import NewTask from './component/Newtask';
import Personalize from './component/Personalize';

function App() {
    const savedNickname = localStorage.getItem('nickname') || 'Tallybuddy';
    const [nickname, setNickname] = useState(savedNickname);
    const [lists, setLists] = useState([]); 
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nickname]);

    return (
      <Router>
          <div className="App">
              <Header nickname={nickname} />
              <Routes>
                  <Route 
                    path="/" 
                    element={<Home lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />} 
                    exact 
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
                      element={<Personalize setNickname={setNickname} />} 
                  />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
