import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./CreateAccountForm.module.scss";

const schema =yup
  .object({
    name: yup
    .string()
    .min(2, "Name can not be less than 2 characters")
    .max(25, "Name can not be more than 25 characters")
    .typeError("Please type a character")
    .required("Please enter your name"),
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


function CreateAccountForm() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

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

      const json = await response.json();
      console.log(json);
    }
    catch(e){
      console.log(e)
    }

  }

  return (
    <>
      <div className={styles.form_container}>
        <h2 className={styles.h2}>Create Account</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder='Name'/>
          <input className={styles.input} {...register('email')} placeholder='Email' />
          <p>{errors.email?.message}</p>
          <input type="password" className={styles.input} {...register('password')} placeholder="Password"/>
          <p>{errors.password?.message}</p>
          <input className={styles.btn_submit} type="submit" value="Create Account" />
        </form>
        <div className={styles.mid_section}>
          <h3>Or</h3>
          <hr/>
        </div>
          <button className={styles.btn_submit}>Back to login</button>
      </div>
    </>

  )
}

export default CreateAccountForm