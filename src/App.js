import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { MainPage } from "./components/MainPage";
// import { Home } from "./pages/home";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Create } from "./pages/admin/Create";
import MainPage from "./components/MainPage/MainPage";
import WP from "./pages/institutionalMemory/WP";
import AddWP from "./pages/institutionalMemory/AddWP";
import WritRoutes from "./routes/WritRoutes.js";
import ScheduleRoutes from "./routes/ScheduleRoutes.js";
import { WritProvider } from "./pages/institutionalMemory/context/WritContext.js";

function App() {
    return (
        <BrowserRouter>
            <WritProvider>
                <Routes>
                <Route path="/user/" element={<WritRoutes />} />
                    <Route path="/user/wp/*" element={<WritRoutes />} />
                    <Route path="/user/schedule/*" element={<ScheduleRoutes/>}/>
                    <Route path="/" element={<Login />}/>
                    <Route path="/admin" element={<Create />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />}></Route>
                </Routes>
            </WritProvider>
        </BrowserRouter>
    );
}

export default App;