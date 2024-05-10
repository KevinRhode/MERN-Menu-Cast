import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom





function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);  //apollo call
  const { login: tkLogin } = useAuth(); //login to update user state for app
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
    <div >
      

      
      <section className='section'>
      <h2 className='title'>Login</h2>
      <form className='container' onSubmit={handleFormSubmit}>
        <div className="field">
          <label className='label' htmlFor="email">Email address:</label>
          <input className='input'
            placeholder="youremail@provider.com"
            name="email"
            type="email"
            id="email"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className='label' htmlFor="pwd">Password:</label>
          <input
          className='input'
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
        <div className='buttons' >
          <button className='button is-primary' type="submit">Submit</button>
          <Link className='button is-link' to="/signup">← Go to Signup</Link>
        </div>
      </form>
      </section>
    </div>
  );
}

export default Login;