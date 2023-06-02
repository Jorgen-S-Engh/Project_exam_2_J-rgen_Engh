import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./ModalForm.module.scss";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Title can not be less than 2 characters")
    .max(45, "Title can not be more than 45 characters"),
  price: yup.number(),
  maxGuests: yup.number(),
  description: yup.string(),
  rating: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .default(0),
  media: yup.array(),
});

/**
 * ModalForm is a React component that provides a form for creating or updating a venue's information.
 *
 * This form uses the 'react-hook-form' and 'yup' libraries to manage form state and validation.
 * The form includes inputs for a venue's name, price, maximum guests, media URLs, rating, description,
 * country, city, and checkboxes for including WiFi, parking, pets, and breakfast.
 *
 * The form allows for adding additional media inputs dynamically, to add multiple images for a venue.
 *
 * The component also provides an option to delete the venue by making a DELETE request to the API.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle the form submission. This function should accept
 *                                    an object representing the form data.
 * @param {boolean} [props.location=false] - Flag to indicate whether to include the country and city
 *                                           inputs in the form.
 * @param {boolean} [props.onDeleteVenue=false] - Flag to indicate whether to include a button for
 *                                                deleting the venue in the form.
 * @param {string} [props.venueId=null] - The ID of the venue to delete. This is used in the DELETE
 *                                        request to the API.
 *
 * @example
 * return (
 *   <ModalForm onSubmit={handleFormSubmit} location={true} onDeleteVenue={true} venueId={"1234"} />
 * )
 */

function ModalForm({ onSubmit, location, onDeleteVenue, venueId }) {
  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [success, setSuccess] = useState(false);
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

  async function deleteVenue() {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const handleSuccess = () => {
        setSuccess(true);
        console.log("yeeh success");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      };

      if (response.ok) {
        handleSuccess();
        setSuccess(true);
      } else {
        setCustomError(json.errors[0].message);
        setApiError(true);
        throw new Error(`Error updating venue: ${response.statusText}`);
      }
    } catch (error) {
      setApiError(true);
      console.log(error);
    }
  }

  const onSubmitForm = (data) => {
    if (data.media && data.media.length === 1 && data.media[0] === "") {
      data.media = "";
    }
    data.rating = Number(data.rating);
    if (!data.rating) {
      data.rating = 0;
    }
    onSubmit(data);
  };

  return (
    <>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
          <input {...register("name")} placeholder="Name" />
          <p className={styles.error_message}>{errors.name?.message}</p>
          <input {...register("price")} placeholder="Price" />
          <p className={styles.error_message}>{errors.price?.message}</p>
          <input {...register("maxGuests")} placeholder="Max Guests" />
          <p className={styles.error_message}>{errors.maxGuests?.message}</p>
          <div className={styles.media_container}>
            {imageArray.map((index) => (
              <input
                key={index}
                {...register(`media.${index}`)}
                placeholder="Media"
              />
            ))}
          </div>
          <p className={styles.error_message}>{errors.images?.message}</p>
          <button
            className={`${styles.btn}`}
            type="button"
            onClick={addImageArray}
          >
            Add another image
          </button>
          <input {...register("rating")} placeholder="Rating" />
          <p className={styles.error_message}>{errors.rating?.message}</p>
          {location && (
            <div className={styles.location_container}>
              <input {...register("country")} placeholder="Country" />
              <p>{errors.country?.message}</p>
              <input {...register("city")} placeholder="City" />
              <p>{errors.city?.message}</p>
            </div>
          )}
          <textarea
            className={styles.text_area}
            {...register("description")}
            placeholder="Description"
          ></textarea>
          <p>{errors.description?.message}</p>
          <div className={styles.meta_checkbox}>
            <div className={styles.meta_item}>
              <input
                type="checkbox"
                id="wifi_included"
                {...register("WifiIncluded")}
                value={true}
              />
              <label htmlFor="wifi_included">Wifi Included</label>
            </div>
            <div className={styles.meta_item}>
              <input
                type="checkbox"
                id="parking_included"
                {...register("parkingIncluded")}
                value={true}
              />
              <label htmlFor="parking_included">Parking included</label>
            </div>
            <div className={styles.meta_item}>
              <input
                type="checkbox"
                id="pets_allowed"
                {...register("petsAllowed")}
                value={true}
              />
              <label htmlFor="pets_allowed">Pets allowed</label>
            </div>
            <div className={styles.meta_item}>
              <input
                type="checkbox"
                id="breakfast_included"
                {...register("breakfastIncluded")}
                value={true}
              />
              <label htmlFor="breakfast_included">Breakfast included</label>
            </div>
          </div>
          <div className={styles.btn_container}>
            <input
              className={styles.btn_submit}
              type="submit"
              value="Create Venue"
            />
            {onDeleteVenue && (
              <button
                type="button"
                className={styles.btn_delete_venue}
                onClick={deleteVenue}
              >
                Delete Venue
              </button>
            )}
          </div>
        </form>
        {apiError && <ErrorMessage message={customError} />}
        {success && <SuccessMessage message={"Venue Successfully Deleted"} />}
      </div>
    </>
  );
}

export default ModalForm;
