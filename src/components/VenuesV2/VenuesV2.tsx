import { useState, useEffect } from "react";
import { getVenues } from "../api/venues";
import Search from "../Search/Search";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Wifi } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

type VenueData = {
  id: string;
  name: string;
  description: string;
  media: string | { url: string; alt: string }[];

  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
  _count: {
    bookings: number;
  };
};

const baseUrl = "https://v2.api.noroff.dev/";

export default function VenuesV2(): JSX.Element {
  const [venueData, setVenueData] = useState<VenueData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getVenues();
      setVenueData(data);
    }
    fetchData();
  }, []);
  console.log(search);

  function filteredSearch() {
    const searchResults = venueData.filter((words) => {
      return words.name.toLowerCase().includes(search.toLowerCase());
    });

    return searchResults;
  }
  const results = filteredSearch();
  console.log(venueData);

  return (
    <>
      <div>
        {/* <Input onChange={(e) => setSearch(e.target.value)}></Input> */}
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>A-Z</DropdownMenuItem>
            <DropdownMenuItem>Z-A</DropdownMenuItem>
            <DropdownMenuItem>Price Low to high</DropdownMenuItem>
            <DropdownMenuItem>Price High to Low</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Search
          placeholder="email"
          onChange={(e) => setSearch(e.target.value)}
          searchWord={search}
        />
        <div className="flex flex-wrap">
          {results.map((venue) => (
            <Card
              key={venue.id}
              className="w-1/2 h-[500px] flex flex-col items-center"
            >
              <CardHeader>
                <CardTitle>{venue.name}</CardTitle>
              </CardHeader>
              <CardContent className="h-1/2 flex-grow">
                <div className="w-full">
                  <img
                    src={
                      venue.media[0] ? venue.media[0].url : "/fallbackImg.jpg"
                    }
                    alt="Alt text"
                    className="h-48 w-full object-cover"
                  />
                </div>
                <CardDescription className="line-clamp-2 h-1/4 my-5">
                  {venue.description}
                </CardDescription>
                <div>
                  <div className="bold">Price: {venue.price},-</div>
                  <p>{venue.meta.wifi ? <Wifi /> : ""}</p>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
