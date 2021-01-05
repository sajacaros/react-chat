import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {
  const {register, errors, handleSubmit} = useForm(); //{mode:'onChange'}
  const [errorFromSubmit, setErrorFromSubmit] = useState( "" );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch(error) {
      console.log(error);
      setErrorFromSubmit(error.message);
      setTimeout(() => setErrorFromSubmit(''), 5000);
    }
  }

  useEffect(() => {
    return () => {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="auth-wrapper">
      <div style={{textAlign:'center'}}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input 
          name="email" 
          type="email"
          ref={register({required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type ==='required' 
          && <p>This email field is required</p>}
        {errors.email && errors.email.type ==='pattern' 
          && <p>invalid email format</p>}
        
        <label>Password</label>
        <input 
          name="password" 
          type="password" 
          ref={register({required: true, minLength: 6})}
        />
        {errors.password && errors.password.type ==='required' 
          &&<p>This password field is required</p>}
        {errors.password && errors.password.type ==='minLength' 
          &&<p>Password must have at least 6 characters</p>}
        
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link style={{color:'gray', textDecoration:'none'}} to='register'>아직 아이디가 없다면...</Link>
      </form>
    </div>
  )
}

export default LoginPage

