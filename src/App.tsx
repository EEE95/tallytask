import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './Home';
import ListPage from './ListPage';
import NewTask from './component/NewTask';
import Personalize from './component/Personalize';
import Badges from './component/Badges';
import { Task } from './types';

const App: React.FC = () => {
    // State to manage the nickname, defaulting to localStorage or 'Tallybuddy'
    const [nickname, setNickname] = useState<string>(
        localStorage.getItem('nickname') || 'Tallybuddy'
    );

    // Helper function to initialize lists from localStorage
    const initializeLists = () : string [] => {
        const savedLists = localStorage.getItem('lists');
        // Parse saved data or return an empty array
        return savedLists ? JSON.parse(savedLists) : [];
    };

    // Helper function to initialize tasks from localStorage
    const initializeTasks = (): { [key: string]: Task[] } => {
        const savedTasks = localStorage.getItem('tasks');
        // Parse saved data or return an empty object
        return savedTasks ? JSON.parse(savedTasks) : {};
    };

    // State to manage lists and tasks from localStorage or empty arrays
    const [lists, setLists] = useState<string[]>(initializeLists);
    const [tasks, setTasks] = useState<{ [key: string]: any[] }>(initializeTasks);

     // State to manage selected avatar, defaulting to localStorage or null
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    // State to manage selected theme, defaulting to localStorage or null
    const [theme, setTheme] = useState<string | null>(
        localStorage.getItem('theme')
    ); 

    // State to detect if the app is viewed on a mobile device (responsive design)
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    // Save nickname to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nickname]);

    // Save lists to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Load selected avatar from localStorage
    useEffect(() => {
        const savedAvatar = localStorage.getItem('selectedAvatar');
        setSelectedAvatar(savedAvatar);
    }, []);

     // Save selected avatar to localStorage whenever it changes
    useEffect(() => {
        if (selectedAvatar) {
            localStorage.setItem('selectedAvatar', selectedAvatar);
        }
    }, [selectedAvatar]);

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

     // Listen to storage changes and update state accordingly
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
    
        // Event listener to listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
        // Clean up event listener
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Detect window resize to toggle between mobile and desktop views
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Resize listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    

    return (
      <Router>
          <div className={`App ${isMobile ? 'mobile' : 'desktop'}`}>
              <Header nickname={nickname} selectedAvatar={selectedAvatar} theme={theme} />
              
              {isMobile ? ( // Routes for the different pages on mobile
              <Routes>
                  <Route 
                    path="/" 
                    element={<Home lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />} 
                  />
                  <Route 
                    path="/list/:id" 
                    element={<ListPage lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />} 
                  />
                  <Route 
                      path="/newtask" 
                      element={<NewTask lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />} 
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
                    // Desktop: Show everything at once. Be aware that this is only to show our concept of a desktop layout. The functions does not work on desktop, as the descktop version doesn´t handle dynamic updates. This would be our next step in the development.

                    <main className="desktop-layout">
                        <section>
                            <Home lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />
                        </section>
                        <section>
                            <ListPage lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />
                        </section>
                        <section>
                            <Badges />
                        </section>
                    </main>
                )}
              <Footer theme={theme} />
          </div>
      </Router>
  );
}

export default App;
