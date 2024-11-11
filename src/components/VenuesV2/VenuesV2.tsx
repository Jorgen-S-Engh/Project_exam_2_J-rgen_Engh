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
import { Wifi, PawPrint, Utensils, CircleParking } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [searchFilter, setSearchFilter] = useState([]);
  const [finalData, setFinalData] = useState(venueData);

  useEffect(() => {
    async function fetchData() {
      const data = await getVenues();
      setVenueData(data);
    }
    fetchData();
  }, []);

  const sortByNewest = () => {
    const results = [...venueData].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
    return results;
  };

  const aTB = 0;
  console.log(sortByNewest());

  const filteredSearch = () => {
    const searchResults = sortByNewest().filter((words) => {
      return words.name.toLowerCase().includes(search.toLowerCase());
    });
    return searchResults;
  };

  return (
    <>
      <div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>A-Z</DropdownMenuItem>
            <DropdownMenuItem>Z-A</DropdownMenuItem>
            <DropdownMenuItem>Price Low to high</DropdownMenuItem>
            <DropdownMenuItem>Price High to Low</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <Search
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          searchWord={search}
        />
        <div className="flex flex-wrap gap-1 justify-center">
          {filteredSearch().map((venue) => (
            <Link to={`${venue.id}`} key={venue.id}>
              <Card className="h-[500px] w-[450px] flex flex-col items-center">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{venue.name}</CardTitle>
                </CardHeader>
                <CardContent className="h-1/2">
                  <div className="w-full">
                    <img
                      src={
                        venue.media[0] ? venue.media[0].url : "/fallbackImg.jpg"
                      }
                      alt="Alt text"
                      className="h-48 w-[400px] object-cover rounded"
                      onError={(e) =>
                        (e.currentTarget.src = "/fallbackImg.jpg")
                      }
                    />
                  </div>

                  <div className="line-clamp-2 my-3">
                    {" "}
                    <p>{venue.description}</p>
                  </div>

                  <div>
                    <div className="font-bold">Price: {venue.price},-</div>
                    <div className="flex gap-2">
                      {venue.meta.wifi ? <Wifi /> : null}
                      {venue.meta.pets ? <PawPrint /> : null}
                      {venue.meta.breakfast ? <Utensils /> : null}
                      {venue.meta.parking ? <CircleParking /> : null}
                    </div>
                  </div>
                  {venue.media.length}
                  <div>
                    {venue.location.country && venue.location.city
                      ? `${venue.location.city}, ${venue.location.country}`
                      : "Unknown location"}
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
