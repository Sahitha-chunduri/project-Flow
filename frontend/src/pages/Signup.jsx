import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate('/dashboard');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <style>
        {`
          .signup-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom right, #ebf8ff, #c3dafe);
            padding: 1rem;
          }
          .card {
            width: 100%;
            max-width: 400px;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            box-sizing: border-box;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 0.25rem;
          }
          .card-description {
            font-size: 0.9rem;
            text-align: center;
            color: #666;
            margin-bottom: 1.5rem;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          label {
            font-size: 0.875rem;
            font-weight: 500;
          }
          input {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.375rem;
          }
          button.submit-btn {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            font-weight: bold;
            color: white;
            background-color: #4f46e5;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          button.submit-btn:hover {
            background-color: #4338ca;
          }
          .signin-link {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.875rem;
          }
          .signin-link button {
            background: none;
            border: none;
            color: #2563eb;
            cursor: pointer;
            text-decoration: underline;
            font-weight: 500;
          }
        `}
      </style>

      <div className="signup-container">
        <div className="card">
          <div className="card-title">Create account</div>
          <div className="card-description">Sign up for your ProjectFlow account</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                type="text"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Create Account</button>
          </form>
          <div className="signin-link">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
