import dayjs from "dayjs";
import styled from "styled-components";
import CommentDiv from "../styledComponents/CommentDiv";
import StyledContent from "../styledComponents/StyledContent";
require("dayjs/locale/pt-br");

function TodayScreen() {
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

const IntroDiv = styled.div`
  width: 100%;
  padding: 30px 20px;
  font-size: 23px;
  line-height: 28px;
  color: #4e8e57;
`;

export default TodayScreen;
