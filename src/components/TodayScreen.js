import axios from "axios";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import CommentDiv from "../styledComponents/CommentDiv";
import IntroDiv from "../styledComponents/IntroDiv";
import StyledContent from "../styledComponents/StyledContent";
require("dayjs/locale/pt-br");

function TodayScreen() {
  const { token } = useContext(UserContext);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const now = dayjs().locale("pt-br");
  const today = now.day();
  // Getting weekday first letter to be uppercase
  const weekday = now
    .format("dddd")
    .split("")
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      } else {
        return char;
      }
    })
    .join("");

  function formatMonth() {
    if (now.month() + 1 < 10) {
      return `0${now.month() + 1}`;
    } else {
      return now.month();
    }
  }

  const monthFormat = formatMonth();

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
      let habits = res.data;
      habits = habits.filter((habit) => habit.days.includes(today));
      console.log(habits);
      setTodaysHabits(habits);
    });
    promise.catch(() => {
      alert("Algo deu errado!");
    });
  }, []);

  return (
    <StyledContent>
      <IntroDiv>
        <div>
          {weekday}, {now.date()}/{monthFormat}{" "}
        </div>
        <CommentDiv color="#BABABA">Nenhum hábito concluído ainda</CommentDiv>
      </IntroDiv>
    </StyledContent>
  );
}

export default TodayScreen;
