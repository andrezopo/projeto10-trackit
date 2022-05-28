import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import CommentDiv from "../styledComponents/CommentDiv";
import IntroDiv from "../styledComponents/IntroDiv";
import StyledButton from "../styledComponents/StyledButton";
import StyledContent from "../styledComponents/StyledContent";

function HabitScreen() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [userHabits, setUserHabits] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((res) => {
      const habits = res.data;
      setUserHabits(habits);
      console.log(userHabits);
    });
    promise.catch(() => {
      alert("Algo deu errado!");
    });
  }, []);

  function renderHabits() {
    if (userHabits.length !== 0) {
      return userHabits.map((habit) => <div>{habit.name}</div>);
    } else
      return (
        <CommentDiv color="#666666">
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </CommentDiv>
      );
  }

  const habits = renderHabits();

  return (
    <StyledContent>
      <IntroDiv direction={"row"}>
        <div>Meus hábitos</div>
        <StyledButton width="40" height="35" fontSize="27">
          +
        </StyledButton>
      </IntroDiv>
      {habits}
    </StyledContent>
  );
}

export default HabitScreen;
