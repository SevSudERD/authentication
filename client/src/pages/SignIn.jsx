import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* background image */}
      <div className="flex-1 bg-signin-bg bg-cover bg-center hidden lg:block" />

      {/* Form Alanı */}
      <div className="flex-1 flex items-center justify-center p-4 bg-black">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-semibold my-7 text-green-700">SIGN IN</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
            <input type="password" placeholder="password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
            <button disabled={loading} className="bg-green-700 text-white p-3 rounded-lg uppercase hover:bg-green-900 disabled:opacity-80"> {loading ? 'Loading...' : 'Sign In'}</button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Don't have an account ?</p>
            <Link to='/sign-up'>
              <span className="text-green-700">sign up</span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">{error && 'something went wrong'}</p>
        </div>
      </div>
    </div>
  );
}
