import { Input } from "../ui/input";
import { useState } from "react";

type searchProps = {
  placeholder: string;
  searchWord: string;
};

export default function Search({
  placeholder,
  searchWord,
  onChange,
}: searchProps): JSX.Element {
  const [search, setSearch] = useState("");
  console.log(searchWord);

  return (
    <div className="flex justify-center my-5">
      <Input className="w-1/2" placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
