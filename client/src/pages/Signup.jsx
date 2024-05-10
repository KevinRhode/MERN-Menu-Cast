import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from '../utils/AuthContext'; 
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
 



function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' , firstName: '', lastName: ''});
  const [addUser] = useMutation(ADD_USER);
  const {login:tkLogin} = useAuth(); //login to update user state for app
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    tkLogin(token);
    navigate('/');
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
      
      <form onSubmit={handleFormSubmit} className='section'>
      <h2 className='title'>Signup</h2>
        <div className="field">
          <label className='label' htmlFor="firstName">First Name:</label>
          <input className='input'
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className='label' htmlFor="lastName">Last Name:</label>
          <input className='input'
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className='label' htmlFor="email">Email:</label>
          <input className='input'
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className='label' htmlFor="pwd">Password:</label>
          <input className='input'
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button className='button is-primary' type="submit">Submit</button>
          <Link className='button is-link' to="/login">← Go to Login</Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;