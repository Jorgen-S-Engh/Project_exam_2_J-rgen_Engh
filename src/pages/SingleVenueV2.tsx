import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyDatePicker from "@/components/MyCalendar";
import MyAvatar from "@/components/Avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MetaDetails from "@/components/MetaDetails";

type SingleVenueData = {
  name: string;
  description: string;
  created: string;
  updated: string;
  price: number;
  media: [];
  url: string;
  alt: string;
};

export default function SingleVenueV2(): JSX.Element {
  const { id } = useParams();
  const [results, setResults] = useState<SingleVenueData | null>(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [formatttedUpdatedDate, setFormattedUpdateDate] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
      );
      const data = await response.json();
      setResults(data.data);
      // setFormattedDate(data.data.created);
      // const date = new Date(data.data.created);
      // const formatted = date.toLocaleString("en-GB");
      // setFormattedDate(formatted);
    }
    getData();
  }, []);

  useEffect(() => {
    if (results) {
      console.log(results);
    }
  });

  useEffect(() => {
    if (results) {
      const date = new Date(results.created);
      const formatted = date.toLocaleString("en-GB");
      setFormattedDate(formatted);

      const updatedDate = new Date(results.updated);
      const formattedUpdated = updatedDate.toLocaleString("en-GB");
      setFormattedUpdateDate(formattedUpdated);
    }
  }, [results]);

  if (!results) return <h1>Loading....</h1>;
  console.log(results);

  return (
    <div className="flex items-center flex-col gap-3">
      <div className="mx-44 mt-10 max-w-[1000px]">
        {results.media.length > 1 && results.media[0] ? (
          <Carousel>
            <CarouselContent>
              {results.media.map((item) => (
                <CarouselItem>
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-[400px] object-cover rounded"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <img
            src={results.media[0] ? results.media[0].url : "/fallbackImg.jpg"}
            alt="Alt text"
            className="w-full h-[400px] object-cover rounded"
            onError={(e) => (e.currentTarget.src = "/fallbackImg.jpg")}
          />
        )}

        <div className="flex gap-5 justify-between info-container mt-10">
          <div className="w-3/5 description-container">
            <div>
              <h1 className="font-bold">Venue: {results.name}</h1>
            </div>
            <p className="h-auto max-h-[150px] overflow-auto my-2">
              Description: {results.description}
            </p>
            <div className="font-bold">Price: {results.price},-</div>
            <div className="flex items-center w-full justify-between">
              <div>
                <h4 className="font-bold">Location</h4>
                {results.location.country && results.location.city
                  ? `${results.location.city}, ${results.location.country}`
                  : "Unknown location"}
              </div>
              <div className="my-3 ">
                <h4 className="mb-2 font-bold">Facilities</h4>
                <MetaDetails
                  wifi={results.meta.wifi}
                  pets={results.meta.pets}
                  breakfast={results.meta.breakfast}
                  parking={results.meta.parking}
                />
              </div>
            </div>
            {/* <p>Created: {formattedDate}</p>
          <p>Updated: {formatttedUpdatedDate}</p> */}
          </div>
          <div className="w-2/5 owner-container">
            <div className="flex flex-col items-center border relative">
              <div className="w-full">
                <img
                  src={
                    results.owner.banner
                      ? results.owner.banner.url
                      : "/fallbackImg.jpg"
                  }
                  onError={(e) => (e.currentTarget.src = "/fallbackImg.jpg")}
                  alt=""
                  className="w-full h-[75px] object-cover"
                />
              </div>
              <div className="absolute top-14 left-4">
                <MyAvatar src={results.owner.avatar.url} />
              </div>
              <div className="flex flex-col items-center mt-5">
                <div className="font-bold">{results.owner.name}</div>
                <div>{results.owner.email}</div>
                <Link to="/" className="my-5">
                  <Button>View Owner</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
