import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    NavigationBar,
    Home,
    PlaceOrder,
    Orders,
    ViewBurger,
    AddBurger,
    PrivateRoute,
    SignUp,
    LogIn
} from "./Components";
import { useEffect, useState } from "react";

function App() {

    const [isSignedIn, setIsSignedIn] = useState();

    const NavigationBarLayout = ({children}) => (
        <>
        <NavigationBar />
        {children}
        </>
    )

    return (
        <div className="App">  
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp />}/>
                    <Route path="/login" element={<LogIn />} />

                    <Route exact path="/home" element={
                        <NavigationBarLayout><PrivateRoute><Home /></PrivateRoute></NavigationBarLayout>
                    } />
                    <Route path="/orders" element={
                        <NavigationBarLayout><PrivateRoute><Orders /></PrivateRoute></NavigationBarLayout>
                    } />
                    <Route path="/order/:id" element={
                        <NavigationBarLayout><PrivateRoute><PlaceOrder /></PrivateRoute></NavigationBarLayout>
                    } />

                    <Route path="/burgers/:id" element={
                        <NavigationBarLayout><PrivateRoute><ViewBurger /></PrivateRoute></NavigationBarLayout>
                    } />
                    
                    <Route path="/burgers/add" element={
                        <NavigationBarLayout><PrivateRoute><AddBurger /></PrivateRoute></NavigationBarLayout>
                    } />
                    {/* <Route element={AuthenticatedRoutes} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
