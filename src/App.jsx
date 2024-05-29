import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route
            className="bg-black"
            path="*"
            element={<Navigate to="/signin" replace />}
          />
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
