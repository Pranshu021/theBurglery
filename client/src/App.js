import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import PlaceOrder from './Components/PlaceOrder';
import Orders from './Components/Orders';
import ViewBurger from './Components/ViewBurger';
import AddBurger from './Components/AddBurger';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<PlaceOrder />} />
            <Route path="/burgers/:id" element={<ViewBurger />} />
            <Route path="/burgers/add" element={<AddBurger />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
