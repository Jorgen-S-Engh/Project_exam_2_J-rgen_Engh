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
    rating: yup
      .number(),
});

function ModalForm({ onSubmit, rating, location, onDeleteVenue }) {
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

  async function deleteVenue()  {
    try{
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,{
        method: "DELETE",
        headers: {
          "Authorization" : `Bearer${localstorage.getItem("accessToken")}`
        }
      })
    }catch(e){
      console.log(e)
    }
  }

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
          {rating && (
            <>
              <input {...register('rating')} placeholder="Rating"/>
              <p>{errors.rating?.message}</p>
            
            </>
          )}
          {location && (
              <div className={styles.location_container}>
                <input {...register("country")} placeholder="Country"/>
                <p>{errors.country?.message}</p>
                <input {...register("city")} placeholder="City"/>
                <p>{errors.city?.message}</p>
              </div> 
          )}

          <textarea className={styles.text_area} {...register("description")} placeholder='Description'></textarea>
          <p>{errors.description?.message}</p>
          <div className={styles.meta_checkbox}>
            <div className={styles.meta_item}>
              <input type="checkbox" id="wifi_included" {...register("WifiIncluded")} value={true}/>
              <label htmlFor="wifi_included">Wifi Included</label>
            </div>
            <div className={styles.meta_item}>
              <input type="checkbox" id="parking_included" {...register("parkingIncluded")} value={true}/>
              <label htmlFor="parking_included">Parking included</label>
            </div>
            <div className={styles.meta_item}>
              <input type="checkbox" id="pets_allowed" {...register("petsAllowed")} value={true}/>
              <label htmlFor="pets_allowed">Pets allowed</label>
            </div>
            <div className={styles.meta_item}>
              <input type="checkbox" id="breakfast_included" {...register("breakfastIncluded")} value={true}/>
              <label htmlFor="breakfast_included">Breakfast included</label>
            </div>
          </div>
          <div className={styles.btn_container}>
            <input className={styles.btn_submit} type="submit" value="Save changes" />
            {deleteVenue && (
              <button type="button" className={styles.btn_delete_venue} onClick={deleteVenue}>Delete Venue</button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalForm;
