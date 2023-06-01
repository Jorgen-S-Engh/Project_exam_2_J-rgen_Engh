import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./CreateAccountForm.module.scss";
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import WelcomeTextLogin from '../WelcomeTextLogin';


const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Name can not be less than 2 characters")
      .max(25, "Name can not be more than 25 characters")
      .typeError("Please type a character")
      .required("Please enter your name"),
    email: yup
      .string()
      .matches(
        /^[\w\-.]+@stud\.noroff\.no$/,
        "Email must match pattern: example@stud.noroff.no"
      )
      .required("Please enter a valid email"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 characters minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    avatar: yup
      .string(),

}).required();

/**
 * Form component for creating a new account.
 *
 * @component
 *
 * @example
 * return (
 *   <CreateAccountForm />
 * )
*/

function CreateAccountForm() {

  const navigate = useNavigate()
  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  async function onSubmit(data){
    setApiError(false); 
    data.venueManager = data.venueManager==="true";
    console.log(data)
    try{
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();


      const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2500); 
      };


      if(response.status === 201){
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("venueManager", data.venueManager);
        localStorage.setItem("password", data.password);
        handleSuccess();

      }else{
        {
          setCustomError(json.errors[0].message)
          setApiError(true);
          setTimeout(() =>{
            setApiError(false)
          }, 5000)
          return;
        }
      }
      console.log(JSON.stringify(data))

    }
    catch(e){
      console.log(e)
      setApiError(true);
    }

  }

  return (
    <>
      <div className={styles.component_container}>
        <WelcomeTextLogin/>
        <div className={styles.form_container}>
          <h2 className={styles.h2}>Create Account</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder='Name'/>
            <p>{errors.name?.message}</p>
            <input {...register('email')} placeholder='Email' />
            <p>{errors.email?.message}</p>
            <input type="password" {...register('password')} placeholder="Password"/>
            <p>{errors.password?.message}</p>
            <input {...register('avatar')} placeholder="Avatar"/>
            <p>{errors.avatar?.message}</p>
            <div className={styles.venue_manager}>
              <input type="checkbox" id="venue_manager" {...register("venueManager")} value={true}/>
              <label htmlFor="venue_manager">I want to be a venue manager</label>
            </div>
            <div className={styles.message_container}>
              {apiError && <ErrorMessage message={customError}/>}
              {success && <SuccessMessage message={"Account created successfully! Redirecting to login"}/>}
            </div>
            <input className={styles.btn_submit} type="submit" value="Create Account" />

          </form>
          <div className={styles.mid_section}>
            <h3>Or</h3>
            <hr/>
          </div>
            <button className={styles.btn_submit} onClick={(()=> navigate("/login"))}>Back to login</button>
        </div>
      </div>
    </>

  )
}

export default CreateAccountForm


