import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HabitScreen from "./HabitScreen";
import Header from "./Header";
import HistoryScreen from "./HistoryScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import TodayScreen from "./TodayScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<SignUpScreen />} />
        <Route path="/habitos" element={<HabitScreen />} />
        <Route path="/hoje" element={<TodayScreen />} />
        <Route path="/historico" element={<HistoryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
