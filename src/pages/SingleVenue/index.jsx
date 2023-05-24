import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from "./SingleVenue.module.scss";  
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { formatISO, set } from 'date-fns';
import breakfast from "../../assets/breakfast.png"
import pets from "../../assets/pawprint.png"
import wifi from "../../assets/wifi.png"
import parking from "../../assets/parked-car.png"
import guests from "../../assets/group.png"
import NoUser from '../../components/NoUser';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", width: "30px", height: "30px", right: "10px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", width: "30px", height: "30px", left: "10px", zIndex: "1" }}
      onClick={onClick}
    />
  );
}

function SingleVenue() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        setData(json);
        setEvents(json.bookings.map(booking => ({
          title: 'Booked',
          start: new Date(booking.dateFrom).toISOString(),
          end: new Date(booking.dateTo).toISOString(),
          allDay: true
        })));
        // if(response.ok){
        //   setSuccess(true)
        // }else{
        //   setApiError(true)
        //   setCustomError(json.errors[0].message)
        // }
      } catch (error) {
        // setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`);
  }, [id]);

  const checkAvailability = (start, end) => {
    const startDateISO = formatISO(start, { representation: 'date' });
    const endDateISO = formatISO(end, { representation: 'date' });
  
    const isBooked = events.some(event => {
      const eventStart = formatISO(new Date(event.start), { representation: 'date' });
      const eventEnd = formatISO(new Date(event.end), { representation: 'date' });
  
      return (startDateISO >= eventStart && startDateISO <= eventEnd) || 
             (endDateISO >= eventStart && endDateISO <= eventEnd) ||
             (startDateISO <= eventStart && endDateISO >= eventEnd);
    });
  
    return !isBooked;
  };
  
  const handleBooking = async () => {

    const handleErrorMessage = () =>{
      setApiError(true)
      setTimeout(() =>{
        setApiError(false)
      }, 5000)
    }

    if (!selectedStartDate || !selectedEndDate) {
      handleErrorMessage()
      setCustomError("Please select a start and end date")
      return;
    }
  
    if (!checkAvailability(new Date(selectedStartDate), new Date(selectedEndDate))) {
      handleErrorMessage()
      setCustomError("The selected date range is already booked")
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          venueId: id,
          dateFrom: selectedStartDate,
          dateTo: selectedEndDate,
          guests: 1,
        }),
      });

      setSuccess(true)
      setTimeout(() =>{
        setSuccess(false)
      }, 5000)


      console.log(response)
  
      const newBooking = await response.json();
      const endDate = new Date(selectedEndDate);
      endDate.setDate(endDate.getDate() + 1); 
      if (newBooking) {
        setEvents([...events, {
          title: 'Booked',
          start: new Date(selectedStartDate).toISOString(),
          end: endDate.toISOString(), 
          allDay: true
        }]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  if (isLoading || !data) {
    return (
      <>
        <Spinner/>
      </>
    );
  }

  if (isError) {
    return <h1>Something went wrong, please try again</h1>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.component_container}>
        <Header/>
        <div className={styles.image_container}>
          {data.media && (
            <Slider {...settings}>
              {data.media.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={data.name} />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className={styles.heading_container}>
          <h1>{data.name}</h1>
          <h2>Description</h2>
          <p>{data.description}</p>
        </div>
        <div className={styles.meta_container}>
            {data.meta.wifi && <img src={wifi} alt="wifi icon"/>}
            {data.meta.pets && <img src={pets} alt="pets icon"/>}
            {data.meta.breakfast && <img src={breakfast} alt="breakfast icon"/>}
            {data.meta.parking && <img src={parking} alt="parking icon"/>}
        </div>
        <div className={styles.info_container}>
            <p>Price: {data.price}</p>
            <p>Rating: {data.rating}</p>
        </div>

        <div className={styles.booking_container}>
          
        </div>  
        <div className={styles.calendar_container}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: 'prev,next',
              center: '',
              right: 'title'
            }}/>
        </div>
        <div className={styles.message_container}>
            {apiError && <ErrorMessage message={customError}/>}
            {success && <SuccessMessage message={"Date successfully booked!"}/>}
          </div>

        {localStorage.getItem('accessToken') ? (
          <div className={styles.booking_container}>
            <h2>Book your holiday</h2>
            <label htmlFor="date_from">From date</label>
            <input type="date" id="date_from" value={selectedStartDate || ''} onChange={(e) => setSelectedStartDate(e.target.value)} />
            <label htmlFor="date_to">To date</label>
            <input type="date" id="date_to" value={selectedEndDate || ''} onChange={(e) => setSelectedEndDate(e.target.value)} />
            <button className={styles.btn_submit_date} onClick={handleBooking}>Book Now</button>
          </div>

        ): <NoUser message={"book venue"}/>}

    </div>
  );
}

export default SingleVenue;
