import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../common/authToken';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      if (role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}auth/login`,
        { email, password }
      );
      const { token, role, user } = response.data;
      setEmail('');
      setPassword('');
      setAuthToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      setLoading(false);
      if (role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error?.response?.data?.message ||
          'Invalid login credentials. Please try again.'
      );
    }
  };

  return (
    <div>
      <section className='vh-100'>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='img-fluid'
                alt='Sample image'
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5'>
              <form>
                <div className='form-outline mb-4'>
                  <label className='form-label' htmlFor='form3Example3'>
                    Email address
                  </label>
                  <input
                    type='email'
                    id='form3Example3'
                    className='form-control form-control-lg'
                    placeholder='Enter a valid email address'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                  />
                </div>
                <div className='form-outline mb-3'>
                  <label className='form-label' htmlFor='form3Example4'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='form3Example4'
                    className='form-control form-control-lg'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage('');
                    }}
                  />
                </div>

                {errorMessage && (
                  <div className='alert alert-danger'>{errorMessage}</div>
                )}

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg'
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
