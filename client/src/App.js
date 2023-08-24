import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import PlaceOrder from './Components/PlaceOrder';
import Orders from './Components/Orders';
import EditOrder from './Components/EditOrder';
import LogIn from './Components/LogIn';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/orders" element={<Orders />} />
            <Route path="/order/:burgerName" element={<PlaceOrder />} />
            <Route path="/order/:orderid/edit" element={<PlaceOrder />} />
            {/* <Route path="/order/:burgerName/custom" element={<PlaceOrder />} />
            <Route path="/login" element={<LogIn />}/>
            <Route path="/order/:orderid/addons" element={<EditOrder />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
