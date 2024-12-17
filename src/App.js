import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
        <Home/>
    </div>
    
  );
}

export default App;
