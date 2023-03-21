import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value.toLowerCase()); // Convert email to lowercase
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiResponse = await axios.get('https://6417e3dd8e0487d453e68158.mockapi.io/sid/siddhant');
      let isEmailTaken = false;

      for (let i = 0; i < apiResponse.data.length; i++) {
        if (apiResponse.data[i].email === email.toLowerCase()) {
          isEmailTaken = true;
          break;
        }
      }

      if (isEmailTaken) {
        alert('Email already taken');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const ios = axios.create({
        baseURL: 'https://6417e3dd8e0487d453e68158.mockapi.io',
      });

      const response = await ios.post(
        '/sid/siddhant',
        {
          name,
          email,
          password: hashedPassword,
        }
      );
      console.log(response);
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;