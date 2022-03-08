import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../componentes/Loading';

const MIN_LOGIN_LENGTH = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInput: '',
      isButtonDisable: true,
      isLoading: false,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value.length >= MIN_LOGIN_LENGTH) {
      this.setState({ isButtonDisable: false });
    } else {
      this.setState({ isButtonDisable: true });
    }
  }

  handleButton = async () => {
    this.setState({ isLoading: true });
    const { loginName } = this.state;
    const request = await createUser({ name: loginName });
    console.log(request);
    this.setState({
      isLoading: false,
      redirect: true,
    });
  }

  render() {
    const { loginInput, isButtonDisable, isLoading, redirect } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <label htmlFor="loginInput">
          <h1>Login</h1>
          <input
            data-testid="login-name-input"
            type="text"
            name="loginInput"
            id="loginInput"
            onChange={ this.onInputChange }
            value={ loginInput }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isButtonDisable }
          onClick={ this.handleButton }
        >
          Entrar
        </button>
        {redirect ? <Redirect to="search" /> : ''}
      </div>
    );
  }
}

export default Login;
