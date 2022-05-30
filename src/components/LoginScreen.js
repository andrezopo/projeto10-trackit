import StyledButton from "../styledComponents/StyledButton";
import loginLogo from "../assets/images/LoginLogo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledContainer from "../styledComponents/StyledContainer";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

function LoginScreen() {
  const stringifiedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(stringifiedUserInfo);
  const { email, setEmail, password, setPassword, setToken, setImage } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  if (userInfo) {
    setToken(userInfo.token);
    setImage(userInfo.image);
    navigate("/hoje", { replace: true });
  }

  function signIn(e) {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      body
    );
    setDisable(true);
    promise.then((res) => {
      const response = res.data;
      const userInfo = {
        id: response.id,
        name: response.name,
        image: response.image,
        email: response.email,
        password: response.password,
        token: response.token,
      };
      const stringifiedUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", stringifiedUserInfo);
      setImage(response.image);
      setToken(response.token);
      setDisable(false);

      navigate("/hoje", { replace: true });
    });
    promise.catch((err) => {
      alert(err.message);
      setDisable(false);
    });
  }

  return (
    <StyledContainer disabled={disable}>
      <img src={loginLogo} alt="login logo" />
      <form onSubmit={signIn}>
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
        <StyledButton disabled={disable} height={45} width={300} fontSize={21}>
          {disable ? (
            <ThreeDots color="#ffffff" width={50} height={15} />
          ) : (
            "Entrar"
          )}
        </StyledButton>
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </StyledContainer>
  );
}

export default LoginScreen;
