import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import HabitScreen from "./HabitScreen";
import Header from "./Header";
import HistoryScreen from "./HistoryScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import TodayScreen from "./TodayScreen";
import FooterMenu from "./FooterMenu";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [todaysHabits, setTodaysHabits] = useState(null);
  const [doneHabits, setDoneHabits] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          email,
          setEmail,
          password,
          setPassword,
          token,
          setToken,
          name,
          setName,
          image,
          setImage,
          todaysHabits,
          setTodaysHabits,
          doneHabits,
          setDoneHabits,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<SignUpScreen />} />
          <Route path="/habitos" element={<HabitScreen />} />
          <Route path="/hoje" element={<TodayScreen />} />
          <Route path="/historico" element={<HistoryScreen />} />
        </Routes>
        <FooterMenu />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
