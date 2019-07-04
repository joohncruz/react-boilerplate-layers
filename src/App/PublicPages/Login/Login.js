import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submit = async () => {
    const { email, password } = this.state;
    const { loadAuth } = this.props;

    await loadAuth({ email, password });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login">
        <form>
          <input
              id="email"
              label="Email"
              type="text"
              value={email}
              onChange={this.handleChange}
          />
          <input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={this.handleChange}
          />
        </form>
        <button onClick={this.submit}>
            Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loadAuth: PropTypes.func.isRequired,
};

export default Login;