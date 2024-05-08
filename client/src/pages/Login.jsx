import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
 




function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);  //apollo call
  const {login:tkLogin} = useAuth(); //login to update user state for app
  const navigate = useNavigate(); // Initialize useNavigate


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      tkLogin(token);
      navigate('/');
      
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="inputs">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@provider.com"
            name="email"
            type="email"
            id="email"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="inputs">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;