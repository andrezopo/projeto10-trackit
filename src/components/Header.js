import styled from "styled-components";
import logo from "../assets/images/TrackIt.png";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

function Header() {
  const { image } = useContext(UserContext);
  const location = useLocation();
  function showHeader() {
    if (location.pathname !== "/" && location.pathname !== "/cadastro") {
      return (
        <>
          <StyledHeader>
            <img src={logo} alt="logo" />
            <img src={image} alt="user" />
          </StyledHeader>
        </>
      );
    } else {
      return null;
    }
  }
  const headerVisibility = showHeader();

  return headerVisibility;
}

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #4e8e57;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  img:nth-child(2) {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 25px;
  }
`;

export default Header;
