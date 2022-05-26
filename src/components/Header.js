import styled from "styled-components";
import logo from "../assets/images/TrackIt.png";
import gon from "../assets/images/Gon.png";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  function showHeader() {
    if (location.pathname !== "/" && location.pathname !== "/cadastro") {
      return (
        <>
          <StyledHeader>
            <img src={logo} alt="logo" />
            <img src={gon} alt="gon-freecs" />
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

  img:nth-child(2) {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 25px;
  }
`;

export default Header;
