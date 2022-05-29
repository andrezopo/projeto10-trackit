import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import CommentDiv from "../styledComponents/CommentDiv";
import HabitDiv from "../styledComponents/HabitDiv";
import IntroDiv from "../styledComponents/IntroDiv";
import StyledButton from "../styledComponents/StyledButton";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledContent from "../styledComponents/StyledContent";
import UserHabitsDiv from "../styledComponents/UserHabitsDiv";

function HabitScreen() {
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [habitName, setHabitName] = useState("");
  const [habitDays, setHabitDays] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [userHabits, setUserHabits] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [disable, setDisable] = useState(false);

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
    });
    promise.catch(() => {
      alert("Algo deu errado!");
    });
  }, [token]);

  function renderHabits() {
    if (userHabits !== null) {
      if (userHabits.length !== 0) {
        return userHabits.map((habit, index) => (
          <UserHabitsDiv key={index}>
            <HabitDiv>
              <span>{habit.name}</span>
              <div onClick={() => deleteHabit(habit.id)}>
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </HabitDiv>
            <FormButtonsDiv>
              {weekdays.map((day, index) => {
                if (habit.days.includes(index)) {
                  return (
                    <FormButton
                      type="button"
                      key={index}
                      color="#CFCFCF"
                      value={day}
                    >
                      {day}
                    </FormButton>
                  );
                } else {
                  return (
                    <FormButton type="button" key={index} value={day}>
                      {day}
                    </FormButton>
                  );
                }
              })}
            </FormButtonsDiv>
          </UserHabitsDiv>
        ));
      } else
        return (
          <CommentDiv color="#666666">
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </CommentDiv>
        );
    }
  }

  function deleteHabit(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = window.confirm(
      "Você tem certeza que deseja excluir este hábito?"
    );
    if (result) {
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );
      promise.then(() => {
        navigate("/hoje", { replace: true });
        navigate("/habitos", { replace: true });
      });
    }
  }

  function weekdaysForm() {
    return weekdays.map((day, index) => {
      if (habitDays.includes(index)) {
        return (
          <FormButton
            disabled={disable}
            type="button"
            key={index}
            color="#CFCFCF"
            onClick={() => selectDay(index)}
            value={day}
          >
            {day}
          </FormButton>
        );
      } else {
        return (
          <FormButton
            disabled={disable}
            type="button"
            key={index}
            onClick={() => selectDay(index)}
            value={day}
          >
            {day}
          </FormButton>
        );
      }
    });
  }

  function selectDay(dayIndex) {
    if (habitDays.includes(dayIndex)) {
      setHabitDays(habitDays.filter((index) => index !== dayIndex));
    } else {
      setHabitDays([...habitDays, dayIndex]);
    }
  }

  function falseVisibility() {
    setVisibility(false);
  }

  function trueVisibility() {
    setVisibility(true);
  }

  function createHabit(e) {
    e.preventDefault();
    const body = {
      name: habitName,
      days: habitDays,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    setDisable(true);
    promise.then((res) => {
      setHabitName("");
      setHabitDays([]);
      setDisable(false);
      setVisibility(false);
      navigate("/hoje", { replace: true });
      navigate("/habitos", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.statusText);
      setDisable(false);
    });
  }

  const habits = renderHabits();
  const formDays = weekdaysForm();
  if (userHabits !== null) {
    return (
      <StyledContent>
        <IntroDiv direction={"row"}>
          <div>Meus hábitos</div>
          <StyledButton
            onClick={trueVisibility}
            width="40"
            height="35"
            fontSize="27"
          >
            +
          </StyledButton>
        </IntroDiv>
        <CreateHabitForm
          disabled={disable}
          onSubmit={createHabit}
          visible={visibility}
        >
          <StyledContainer>
            <input
              disabled={disable}
              id="habit"
              type="text"
              placeholder="nome do hábito"
              onChange={(e) => setHabitName(e.target.value)}
              value={habitName}
              required
            />
          </StyledContainer>
          <FormButtonsDiv>{formDays}</FormButtonsDiv>
          <ConfirmCreateDiv>
            <span onClick={falseVisibility}>Cancelar</span>
            <StyledButton width="84" height="35" fontSize="16">
              {disable ? (
                <ThreeDots color="#ffffff" width={50} height={15} />
              ) : (
                "Salvar"
              )}
            </StyledButton>
          </ConfirmCreateDiv>
        </CreateHabitForm>
        {habits}
      </StyledContent>
    );
  } else {
    return (
      <StyledContent>
        <IntroDiv direction={"row"}>
          <div>Carregando..</div>
        </IntroDiv>
      </StyledContent>
    );
  }
}

const CreateHabitForm = styled.form`
  display: ${(props) => (props.visible ? "initial" : "none")};
  & * {
    opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  }
`;

const ConfirmCreateDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 45px;
  span {
    color: #8fc549;
    font-size: 16px;
    line-height: 21px;
    margin-right: 24px;
  }
`;

const FormButtonsDiv = styled.div`
  display: flex;
`;

const FormButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.color ? "#cfcfcf" : "#d4d4d4")};
  color: ${(props) => (props.color ? "#ffffff" : "#dbdbdb")};
  background-color: ${(props) => (props.color ? props.color : "#ffffff")};
  border-radius: 5px;
  margin: 8px 2px 30px 2px;
  font-size: 20px;
  line-height: 25px;
`;

export default HabitScreen;
