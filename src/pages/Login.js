import React from 'react';
const MIN_LOGIN_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInput: '',
      isButtonDisable: true,
      isLoading: false,
    }
  }

  onInputChange = ({target}) => {
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

  // handleClick = () => {

  // }

  render() {
    const { loginInput, isButtonDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <label>
          <h1>Login</h1>
          <input
            data-testid="login-name-input"
            type="text"
            name="loginInput"
            onChange={this.onInputChange}
            value={ loginInput }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isButtonDisable }
          // onClick={this.handleClick}
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
