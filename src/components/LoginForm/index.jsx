import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./LoginForm.module.scss";
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';


const schema =yup
  .object({
    email: yup
    .string()
    .email()
    .typeError("Please enter a valid email")
    .required("Please enter a valid email"),
    password: yup
    .string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')


}).required();


function LoginForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);

  async function onSubmit(data){
    try{
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data))

      const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2500); 
      };

      const handleError = () =>{
        setApiError(true);
        setTimeout(() =>{
          setApiError(false)
        },5000)
      }

      if(response.status === 200){
        const json = await response.json();
        console.log(json);
        localStorage.setItem("accessToken", data.accessToken)
        handleSuccess()
      }else{
        handleError();
      }

      
      
    }
    catch(e){
      console.log(e)
    }

  }

  const emailLocal = localStorage.getItem('email') 
  const passwordLocal = localStorage.getItem('password')

  return (
    <>
      <div className={styles.form_container}>
        <h2 className={styles.h2}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.input} {...register('email')} defaultValue={emailLocal? emailLocal : "" } placeholder='Email'/>
          <p>{errors.email?.message}</p>
          <input type="password" className={styles.input} {...register('password')} defaultValue={passwordLocal? passwordLocal : "" } placeholder='Password'/>
          <p>{errors.password?.message}</p>
          <input className={styles.btn_submit} type="submit" value="Login" />
          {apiError ? <ErrorMessage/> : ""}
          {success ? <SuccessMessage/>: ""}
        </form>
        <div className={styles.mid_section}>
          <h3>Or</h3>
          <hr/>
        </div>
          <button className={styles.btn_submit} onClick={(()=> navigate("/create-account"))}>Create account</button>
      </div>
    </>

  )
}

export default LoginForm