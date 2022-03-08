import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInput: '',
      isButtonDisable: true,
      loading: false,
      redirect: false
    }
  }

  onInputChange = ({target}) => {
    const { name, value } = target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { loginInput, isButtonDisabled, loading, shouldRedirect } = this.state;
    return (
      <div data-testid="page-login">
        <label>
          <h1>Login</h1>
          <input
            data-testid="login-name-input"
            type="text"
            name="loginInput"
            onChange={this.onInputChange}
            value={loginInput}
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={}
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
