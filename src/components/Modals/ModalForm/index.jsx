import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./ModalForm.module.scss";


const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Title can not be less than 2 characters")
      .max(25, "Title can not be more than 25 characters"),
    price: yup
      .number(),
    maxGuests: yup
    .number(),
    media: yup
      .array(),
    description: yup
      .string(),
});

function ModalForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageArray, setImageArray] = useState([0]);

  const addImageArray = () => {
    setImageArray([...imageArray, imageArray.length]);
  };

  return (
    <>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder='Name'/>
          <p>{errors.name?.message}</p>
          <input {...register('price')} placeholder='Price' />
          <p>{errors.price?.message}</p>
          <input {...register('maxGuests')} placeholder="Max Guests"/>
          <p>{errors.maxGuests?.message}</p>
          <div className={styles.media_container}>
            {imageArray.map((index) => (
              <input key={index} {...register(`media.${index}`)} placeholder="Media"/>
            ))}
          </div>
          <p>{errors.images?.message}</p>
          <button className={`${styles.btn}`} type="button" onClick={addImageArray}>Add another image</button>
          <textarea className={styles.text_area} {...register("description")} placeholder='Description'></textarea>
          <p>{errors.description?.message}</p>
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
