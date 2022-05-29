import StyledButton from "../styledComponents/StyledButton";
import loginLogo from "../assets/images/LoginLogo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledContainer from "../styledComponents/StyledContainer";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function SignUpScreen() {
  const [disable, setDisable] = useState(false);
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
    setDisable(true);
    promise.then(() => {
      const userInfo = {
        email,
        name,
        image,
      };
      const stringifiedUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", stringifiedUserInfo);
      setDisable(false);
      navigate("/", { replace: true });
    });
    promise.catch((err) => {
      alert(err.message);
      setDisable(false);
    });
  }

  return (
    <StyledContainer disabled={disable}>
      <img src={loginLogo} alt="login logo" />
      <form onSubmit={register}>
        <input
          disabled={disable}
          id="email"
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          disabled={disable}
          id="password"
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input
          disabled={disable}
          id="name"
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          disabled={disable}
          id="image"
          type="text"
          placeholder="foto"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          required
        />
        <StyledButton disabled={disable} height={45} width={300} fontSize={21}>
          Cadastrar
        </StyledButton>
      </form>
      <Link to="/">Já tem uma conta? Faça login!</Link>
    </StyledContainer>
  );
}

export default SignUpScreen;
