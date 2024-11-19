import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './Home';
import ListPage from './ListPage';
import NewTask from './component/NewTask';
import Personalize from './component/Personalize';
import Badges from './component/Badges';

function App() {
    const [nickname, setNickname] = useState<string>(
        localStorage.getItem('nickname') || 'Tallybuddy'
    );

    const initializeLists = () => {
        const savedLists = localStorage.getItem('lists');
        return savedLists ? JSON.parse(savedLists) : [];
    };

    const initializeTasks = () => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    };

    const [lists, setLists] = useState<string[]>(initializeLists);
    const [tasks, setTasks] = useState<{ [key: string]: any[] }>(initializeTasks);

    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
        localStorage.getItem('selectedAvatar')
    );

    const [theme, setTheme] = useState<string | null>(
        localStorage.getItem('theme')
    ); 

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nickname]);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (selectedAvatar) {
            localStorage.setItem('selectedAvatar', selectedAvatar);
        }
    }, [selectedAvatar]);

    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'lists' && event.newValue) {
                setLists(JSON.parse(event.newValue));
            }
            if (event.key === 'tasks' && event.newValue) {
                setTasks(JSON.parse(event.newValue));
            }
            if (event.key === 'nickname' && event.newValue) {
                setNickname(event.newValue);
            }
            if (event.key === 'selectedAvatar' && event.newValue) {
                setSelectedAvatar(event.newValue);
            }
            if (event.key === 'theme' && event.newValue) {
                setTheme(event.newValue);
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    //Responsivitet
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    

    return (
      <Router>
          <div className={`App ${isMobile ? 'mobile' : 'desktop'}`}>
              <Header nickname={nickname} selectedAvatar={selectedAvatar} theme={theme} />
              
              {isMobile ? (
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
                      element={<Personalize setNickname={setNickname} setSelectedAvatar={setSelectedAvatar} setTheme={setTheme} />} 
                  />
                  <Route 
                      path="/badges" 
                      element={<Badges />} 
                  />
              </Routes>

            ) : (
                    // Desktop: Show everything at once
                    <div className="desktop-layout">
                        <Home lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />
                        <ListPage lists={lists} tasks={tasks} setTasks={setTasks} />
                        <Badges />
                    </div>
                )}
              <Footer theme={theme} />
          </div>
      </Router>
  );
}

export default App;
