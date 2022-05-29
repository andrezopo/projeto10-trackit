import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CommentDiv from "../styledComponents/CommentDiv";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";

function FooterMenu() {
  const { doneHabits, todaysHabits } = useContext(UserContext);
  const [percentage, setPercentage] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (todaysHabits !== null) {
      const donePercentage =
        (doneHabits.length / todaysHabits.length).toFixed(2) * 100;
      setPercentage(donePercentage);
    }
  }, [doneHabits, todaysHabits]);

  function showMenu() {
    if (location.pathname !== "/" && location.pathname !== "/cadastro") {
      return (
        <StyledFooter>
          <CommentDiv color="#8fc549">
            <Link to="/habitos">Hábitos</Link>
          </CommentDiv>
          <ProgressbarDiv color="#8fc549">
            <Link to="/hoje">
              <CircularProgressbar
                value={percentage}
                text={`Hoje`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#8fc549",
                  textColor: "#ffffff",
                  pathColor: "#ffffff",
                  trailColor: "transparent",
                })}
              />
            </Link>
          </ProgressbarDiv>
          <CommentDiv color="#8fc549">
            <Link to="/historico">Histórico</Link>
          </CommentDiv>
        </StyledFooter>
      );
    } else return null;
  }

  const footerVisibility = showMenu();

  return footerVisibility;
}

const StyledFooter = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const ProgressbarDiv = styled.div`
  width: 90px;
  height: 90px;
  margin-bottom: 45px;
`;

export default FooterMenu;
