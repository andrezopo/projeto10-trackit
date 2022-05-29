import CommentDiv from "../styledComponents/CommentDiv";
import IntroDiv from "../styledComponents/IntroDiv";
import StyledContent from "../styledComponents/StyledContent";

function HistoryScreen() {
  return (
    <StyledContent>
      <IntroDiv direction={"row"}>
        <div>Histórico</div>
      </IntroDiv>

      <CommentDiv color="#666666">
        Em breve você poderá ver o histórico dos seus hábitos aqui!
      </CommentDiv>
    </StyledContent>
  );
}

export default HistoryScreen;
