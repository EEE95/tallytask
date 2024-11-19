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
    const savedNickname = localStorage.getItem('nickname') || 'Tallybuddy';
    const [nickname, setNickname] = useState(savedNickname);
    const [lists, setLists] = useState<string[]>([]);
    const [tasks, setTasks] = useState<{ [key: string]: any[] }>({});
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [theme, setTheme] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        // Load data from localStorage when the component mounts
    useEffect(() => {
        try {
        const savedLists = localStorage.getItem('lists');
        const savedTasks = localStorage.getItem('tasks');
        const savedAvatar = localStorage.getItem('selectedAvatar');
        const savedTheme = localStorage.getItem('theme');

        if (savedLists) {
            setLists(JSON.parse(savedLists));
        }

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }

        if (savedAvatar) {
            setSelectedAvatar(savedAvatar);
        }

        if (savedTheme) {
            setTheme(savedTheme);
        }
    } catch (error) {
        console.error('Failed to load data from localStorage', error);}
    }, []);

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
        const savedAvatar = localStorage.getItem('selectedAvatar');
        if (savedAvatar) {
            setSelectedAvatar(savedAvatar);
        }
    }, []);

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
