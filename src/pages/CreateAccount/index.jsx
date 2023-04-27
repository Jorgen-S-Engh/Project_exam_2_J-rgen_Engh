import React from 'react'
import styles from "./CreateAccount.module.scss";
import logo from "../../assets/logo.png";
import CreateAccountForm from '../../components/CreateAccountForm';
import WelcomeTextLogin from '../../components/WelcomeTextLogin';



function CreateAccount() {
  return (
    <>
      <WelcomeTextLogin/>
      <CreateAccountForm/>
    
    </>
  
  )
}

export default CreateAccount