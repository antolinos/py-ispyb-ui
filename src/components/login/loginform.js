import React from 'react';
import { Alert, Form, Button, FormControl, Card, FormGroup, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { doSignIn } from 'redux/actions/user';
import UI from 'config/ui';
import ErrorUserMessage from 'components/usermessages/errorusermessage';

function LoginForm(props) {
  const { plugin, site } = props;
  const user = useSelector((state) => state.user);

  const { isAuthenticating } = user;
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  return (
    <Card style={{ padding: '20px 0 ' }} fluid>
      <Form
        className="container-fluid"
        onSubmit={handleSubmit((data) => {
          dispatch(doSignIn(plugin, data.username, data.password, site));
        })}
      >
        {UI.loginForm.header && (
          <p className="text-info" style={{ textAlign: 'left' }}>
            {UI.loginForm.header}
          </p>
        )}
        {user.error && <ErrorUserMessage text={user.error} />}
        {user.isSessionExpired && <Alert variant="warning">Session expired</Alert>}

        <FormGroup controlId="username">
          <FormLabel>{UI.loginForm.usernameLabel}</FormLabel>
          <FormControl {...register('username', { required: true })} type="text" name="username" autoFocus required />
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl {...register('password', { required: true })} type="password" name="password" required />
        </FormGroup>

        <Button style={{ marginTop: 5, width: '100%' }} type="submit" variant="primary">
          {isAuthenticating ? (
            <FontAwesomeIcon className="fa-spin" icon={faSpinner} style={{ marginRight: 10 }}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: 10 }}></FontAwesomeIcon>
          )}
          {isAuthenticating ? 'Signing in...' : 'Sign in'}
        </Button>
      </Form>
    </Card>
  );
}

export default LoginForm;
