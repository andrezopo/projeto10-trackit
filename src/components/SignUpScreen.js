import StyledButton from "../styledComponents/StyledButton";
import loginLogo from "../assets/images/LoginLogo.png";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledContainer from "../styledComponents/StyledContainer";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function SignUpScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    image,
    setImage,
  } = useContext(UserContext);
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    const body = {
      email,
      password,
      name,
      image,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      body
    );
    promise.then(() => {
      const userInfo = {
        email,
        name,
        image,
      };
      const stringifiedUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", stringifiedUserInfo);
      navigate("/", { replace: true });
    });
    promise.catch(() => alert("Falha no cadastro, tente com outros dados"));
  }

  return (
    <StyledContainer>
      <img src={loginLogo} alt="login logo" />
      <form onSubmit={register}>
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
        <input
          id="name"
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          id="image"
          type="text"
          placeholder="foto"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          required
        />
        <StyledButton height={45} width={300} fontSize={21}>
          Cadastrar
        </StyledButton>
      </form>
      <Link to="/">Já tem uma conta? Faça login!</Link>
    </StyledContainer>
  );
}

export default SignUpScreen;
