import axios from "axios";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import CommentDiv from "../styledComponents/CommentDiv";
import HabitDiv from "../styledComponents/HabitDiv";
import IntroDiv from "../styledComponents/IntroDiv";
import StyledContent from "../styledComponents/StyledContent";
require("dayjs/locale/pt-br");

function TodayScreen() {
  const navigate = useNavigate();
  const { token, todaysHabits, setTodaysHabits, doneHabits, setDoneHabits } =
    useContext(UserContext);
  const [doneHabitsPercentage, setDoneHabitsPercentage] = useState(0);
  useEffect(() => {
    if (todaysHabits !== null && todaysHabits.length !== 0) {
      const donePercentage =
        (doneHabits.length / todaysHabits.length).toFixed(2) * 100;
      setDoneHabitsPercentage(donePercentage);
    }
  }, [doneHabits]);
  useEffect(() => {
    setDoneHabits([]);
  }, []);

  const now = dayjs().locale("pt-br");
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
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((res) => {
      setTodaysHabits(res.data);
    });
    promise.catch((err) => {
      alert("Algo deu errado! " + err.response.statusText);
    });
  }, []);

  function doHabit(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
      null,
      config
    );
    promise.then(() => {
      navigate("/historico", { replace: true });
      navigate("/hoje", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.statusText);
    });
  }

  function undoHabit(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
      null,
      config
    );
    promise.then(() => {
      navigate("/historico", { replace: true });
      navigate("/hoje", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.statusText);
    });
  }

  function listHabits() {
    if (todaysHabits !== null) {
      return todaysHabits.map((habit, index) => {
        if (habit.done) {
          if (!doneHabits.includes(habit.id)) {
            setDoneHabits([...doneHabits, habit.id]);
          }
        } else {
          if (doneHabits.includes(habit.id)) {
            setDoneHabits(doneHabits.filter((value) => value !== habit.id));
          }
        }
        return (
          <UserHabitsDiv key={index} done={habit.done} display="flex">
            <TodaysHabitDiv done={habit.done}>
              <HabitDiv>
                <span>{habit.name}</span>
              </HabitDiv>
              <SequenceDiv>
                Sequência atual: <span>{habit.currentSequence}</span>
              </SequenceDiv>
              {habit.currentSequence === habit.highestSequence && habit.done ? (
                <SequenceDiv color={"#8fc549"}>
                  Seu recorde: <span>{habit.highestSequence}</span>
                </SequenceDiv>
              ) : (
                <SequenceDiv>
                  Seu recorde: <span>{habit.highestSequence}</span>
                </SequenceDiv>
              )}
            </TodaysHabitDiv>
            {habit.done ? (
              <div onClick={() => undoHabit(habit.id)}>
                <ion-icon name="checkbox"></ion-icon>
              </div>
            ) : (
              <div onClick={() => doHabit(habit.id)}>
                <ion-icon name="checkbox"></ion-icon>
              </div>
            )}
          </UserHabitsDiv>
        );
      });
    }
  }

  const renderHabits = listHabits();
  if (todaysHabits !== null) {
    return (
      <StyledContent>
        <IntroDiv>
          <div>
            {weekday}, {now.date()}/{monthFormat}{" "}
          </div>
          {doneHabitsPercentage ? (
            <CommentDiv color="#8fc549">{`${doneHabitsPercentage}% dos hábitos concluídos`}</CommentDiv>
          ) : (
            <CommentDiv color="#BABABA">
              Nenhum hábito concluído ainda
            </CommentDiv>
          )}
        </IntroDiv>
        {renderHabits}
      </StyledContent>
    );
  } else {
    return (
      <StyledContent>
        <IntroDiv>
          <div>
            {weekday}, {now.date()}/{monthFormat}{" "}
          </div>
          <CommentDiv color="#BABABA">Carregando Hábitos</CommentDiv>
        </IntroDiv>
      </StyledContent>
    );
  }
}

const SequenceDiv = styled.div`
  font-size: 13px;
  line-height: 17px;
  color: #666666;
  margin-bottom: 0px;
  span {
    color: ${(props) => (props.color ? props.color : "#666666")};
  }
`;

const TodaysHabitDiv = styled.div`
  div:nth-child(2) {
    span {
      color: ${(props) => (props.done ? "#8fc549" : "inherit")};
    }
  }
`;

const UserHabitsDiv = styled.div`
  display: ${(props) => (props.display ? props.display : "initial")};
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 5px auto;
  justify-content: space-between;
  ion-icon {
    color: ${(props) => (props.done ? "#8fc549" : "#e7e7e7")};
    font-size: 69px;
  }
`;

export default TodayScreen;
