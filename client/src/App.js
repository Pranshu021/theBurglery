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

import { AuthProvider } from "./Components/Context/AuthContext";

function App() {

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
                    <Route path="/" element={ <AuthProvider> <SignUp /> </AuthProvider>} />
                    <Route path="/login" element={<AuthProvider> <LogIn /> </AuthProvider>} />

                    <Route exact path="/home" element={ <AuthProvider>
                        <NavigationBarLayout><PrivateRoute><Home /></PrivateRoute></NavigationBarLayout>
                        </AuthProvider>} />

                    <Route path="/orders" element={ <AuthProvider>
                        <NavigationBarLayout><PrivateRoute><Orders /></PrivateRoute></NavigationBarLayout>
                        </AuthProvider> } />

                    <Route path="/order/:id" element={ <AuthProvider>
                        <NavigationBarLayout><PrivateRoute><PlaceOrder /></PrivateRoute></NavigationBarLayout>
                        </AuthProvider> } />

                    <Route path="/burgers/:id" element={ <AuthProvider>
                        <NavigationBarLayout><PrivateRoute><ViewBurger /></PrivateRoute></NavigationBarLayout>
                        </AuthProvider> } />
                    
                    <Route path="/burgers/add" element={ <AuthProvider>
                        <NavigationBarLayout><PrivateRoute><AddBurger /></PrivateRoute></NavigationBarLayout>
                        </AuthProvider> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
