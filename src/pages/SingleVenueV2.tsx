import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyDatePicker from "@/components/MyCalendar";
import MyAvatar from "@/components/Avatar";
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  console.log(results.media);

  return (
    <div className="mx-44 mt-10">
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
      <div>
        <h1 className="font-bold">Venue: {results.name}</h1>
      </div>
      <div className="flex gap-1 flex-row-reverse justify-between">
        <div className="w-1/2">
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
                Read more about the owner
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <p className="h-auto max-h-[150px] overflow-auto my-2">
            Description: {results.description}
          </p>
          <div className="font-bold">{results.price}</div>
          <p>Created: {formattedDate}</p>
          <p>Updated: {formatttedUpdatedDate}</p>
        </div>
      </div>
    </div>
  );
}
