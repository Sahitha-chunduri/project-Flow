import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        console.log('Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .login-container {
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
          button.submit-btn:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
          .signup-link {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.875rem;
          }
          .signup-link button {
            background: none;
            border: none;
            color: #2563eb;
            cursor: pointer;
            text-decoration: underline;
            font-weight: 500;
          }
          .error-message {
            background: #fee;
            color: #c33;
            padding: 0.75rem;
            border-radius: 0.375rem;
            text-align: center;
            font-size: 0.875rem;
            border: 1px solid #fcc;
            margin-bottom: 1rem;
          }
        `}
      </style>
      <div className="login-container">
        <div className="card">
          <div className="card-title">Welcome back</div>
          <div className="card-description">Sign in to your ProjectFlow account</div>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="signup-link">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')}>Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;