import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from "./SingleVenue.module.scss";  
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import MyCalendar from '../../components/Calendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'



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
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();
        console.log(json)

        setData(json);
        setEvents(json.bookings.map(booking => ({
          title: 'Booked',
          start: new Date(booking.dateFrom).toISOString(),
          end: new Date(booking.dateTo).toISOString(),
          allDay: true
        })));

        
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`);
  }, [id]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
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
    <div>
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
      <h1>{data.name}</h1>
      <div className={styles.calendar_container}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
     </div>
    </div>

  )
}


export default SingleVenue
