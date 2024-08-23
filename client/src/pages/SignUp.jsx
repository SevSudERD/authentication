/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* background image */}
      <div className="flex-1 bg-signup-bg bg-cover bg-center hidden lg:block" />

      {/* Form Alanı */}
      <div className="flex-1 flex items-center justify-center p-4 bg-black">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-semibold my-7 text-yellow-700">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
            <input type="email" placeholder="email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
            <input type="password" placeholder="password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
            <button disabled={loading} className="bg-yellow-700 text-white p-3 rounded-lg uppercase hover:bg-yellow-900 disabled:opacity-80"> {loading ? 'Loading...' : 'Sign Up'}</button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account ?</p>
            <Link to='/sign-in'>
              <span className="text-yellow-700">sign in</span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">{error && 'something went wrong'}</p>
        </div>
      </div>
    </div>
  );
}
