import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Pages from './Components/utils/Pages'
import {DataProvider} from './store/GlobalState';

function App() {
  return (
    <DataProvider>
    <div className="App">
    <Router>
    <Navbar/>
    <div className="container my-4">
        <ToastContainer />
        <Pages/>
    </div>
    </Router>  
    </div>
    </DataProvider>
  );
}

export default App;
