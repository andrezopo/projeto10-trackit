import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;

  img {
    width: 180px;
    height: 180px;
    margin: 70px auto 32px auto;
  }

  input {
    width: 300px;
    height: 45px;
    margin-bottom: 6px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    ::placeholder {
      font-family: "Lexend Deca", sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      color: #dbdbdb;
    }
  }

  a {
    font-size: 14px;
    line-height: 17px;
    margin-top: 25px;
    color: #8fc549;
    margin-bottom: 80px;

    &:visited {
      color: #8fc549;
      text-decoration: underline;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default StyledContainer;
