import React, { useState  } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Login.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function Login({ loadAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const submit = async () => {
    await loadAuth({ email, password });
  };

  return (
    <div className="login">
      <form>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />
      </form>
      <Button variant="contained" color="primary" onClick={submit}>
        Entrar
      </Button>
    </div>
  );
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loadAuth: PropTypes.func.isRequired,
};

export default Login;