import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CommentDiv from "../styledComponents/CommentDiv";

function FooterMenu() {
  const location = useLocation();
  function showMenu() {
    if (location.pathname !== "/" && location.pathname !== "/cadastro") {
      return (
        <StyledFooter>
          <CommentDiv color="#8fc549">
            <Link to="/habitos">Hábitos</Link>
          </CommentDiv>
          <CommentDiv color="#8fc549">
            <Link to="/hoje">Hoje</Link>
          </CommentDiv>
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

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default FooterMenu;
