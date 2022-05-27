import StyledButton from "../styledComponents/StyledButton";
import loginLogo from "../assets/images/LoginLogo.png";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <img src={loginLogo} alt="login logo" />
      <form>
        <input
          id="email"
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <StyledButton height={45} width={300} text="Entrar" fontSize={21}>
          Entrar
        </StyledButton>
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </Container>
  );
}

const Container = styled.div`
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

export default LoginScreen;
