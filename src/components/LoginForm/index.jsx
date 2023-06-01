import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./LoginForm.module.scss";
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import WelcomeTextLogin from '../WelcomeTextLogin';


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


/**
 * LoginForm is a React component that presents a form for user login.
 * 
 * This component handles user authentication with an API by sending a POST request with the 
 * user's email and password. It also leverages react-hook-form for form validation using the yupResolver.
 * 
 * On successful login, user details and access token are stored in localStorage and the user is redirected to 
 * the home page. On failure, an error message is displayed to the user.
 * 
 * The form also provides options for navigating to account creation or proceeding without user authentication.
 *
 * @component
 * 
 * @example
 * return (
 *   <LoginForm />
 * )
 */


function LoginForm() {
  const navigate = useNavigate();
  const [customError, setCustomError] = useState('');

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
      const json = await response.json();

      const handleSuccess = () => {
        setSuccess(true);
        console.log(json)

        setTimeout(() => {
          navigate('/');
        }, 1500); 
      };

      const handleError = () =>{
        setApiError(true);
        setTimeout(() =>{
          setApiError(false)
        },5000)
      }

      if(response.status === 200){
        localStorage.setItem("name", json.name);
        localStorage.setItem("email", json.email);
        localStorage.setItem("avatar", json.avatar);
        localStorage.setItem("venueManager", json.venueManager);
        localStorage.setItem("accessToken", json.accessToken)
        handleSuccess()
      }else{
        setCustomError(json.errors[0].message)
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
    <div className={styles.component_container}>
      <WelcomeTextLogin/>
        <div className={styles.form_container}>
          <h2 className={styles.h2}>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.input} {...register('email')} defaultValue={emailLocal? emailLocal : "" } placeholder='Email'/>
            <p>{errors.email?.message}</p>
            <input type="password" className={styles.input} {...register('password')} defaultValue={passwordLocal? passwordLocal : "" } placeholder='Password'/>
            <p>{errors.password?.message}</p>
            <input className={styles.btn_submit} type="submit" value="Login" />

            <div className={styles.message_container}>
              {apiError && <ErrorMessage message={customError}/>}
              {success && <SuccessMessage message={"Login Successfull!"}/>}
            </div>
          </form>
          <div className={styles.mid_section}>
            <h3>Or</h3>
            <hr/>
          </div>
            <button className={styles.btn_submit} onClick={(()=> navigate("/create-account"))}>Create account</button>
            <button className={`${styles.btn_submit} ${styles.btn_no_user}`} onClick={(()=> navigate("/"))}>Continue without user</button>
        </div>
     </div>
        
    </>

  )
}

export default LoginForm