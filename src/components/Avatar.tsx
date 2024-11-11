import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyAvatar({ src }) {
  return (
    <>
      <Avatar>
        <AvatarImage src={src ? src : "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}
