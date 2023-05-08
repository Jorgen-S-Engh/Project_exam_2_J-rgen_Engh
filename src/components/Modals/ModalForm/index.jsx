import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from "./ModalForm.modal.scss";


const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Name can not be less than 2 characters")
      .max(25, "Name can not be more than 25 characters")
      .typeError("Please type a character")
      .required("Please enter your name"),
    price: yup
      .number()
      .required("Please enter a number"),
    maxGuests: yup
    .number()
    .required("Please enter a number"),
    image: yup
      .string(),
    description: yup
      .string(),

}).required();

function ModalForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(){
    //Api call
    console.log("Hei")
  }


  return (
    <>
      <div className={styles.form_container}>
        <h2 className={styles.h2}>Create Account</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder='Name'/>
          <p>{errors.name?.message}</p>
          <input {...register('price')} placeholder='Price' />
          <p>{errors.price?.message}</p>
          <input {...register('maxGuests')} placeholder="Max Guests"/>
          <p>{errors.maxGuests?.message}</p>
          <input {...register('image')} placeholder="Image"/>
          <p>{errors.image?.message}</p>
          <div className={styles.meta_checkbox}>
            <input type="checkbox" id="wifi_included" {...register("WifiIncluded")} value={true}/>
            <label htmlFor="wifi_included">Wifi Included</label>
            <input type="checkbox" id="parking_included" {...register("parkingIncluded")} value={true}/>
            <label htmlFor="parking_included">Parking included</label>
            <input type="checkbox" id="pets_allowed" {...register("petsAllowed")} value={true}/>
            <label htmlFor="pets_allowed">Pets allowed</label>
            <input type="checkbox" id="breakfast_included" {...register("breakfastIncluded")} value={true}/>
            <label htmlFor="breakfast_included">Breakfast included</label>
          </div>
          <input className={styles.btn_submit} type="submit" value="Save changes" />
        </form>

      </div>
    </>

  )
}

export default ModalForm;