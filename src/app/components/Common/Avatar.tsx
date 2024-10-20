import abbreviateName from "../../utils/abbreviateName";

interface AvatarProps{
    name: string;

}

const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center text-background font-semibold text-xl grow p-6">
      {abbreviateName(name)}
    </div>
  );
};

export default Avatar;