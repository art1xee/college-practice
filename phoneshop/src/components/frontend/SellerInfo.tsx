interface SellerInfoProps {
    name: string;
    joinDate: string;
    avatar: string;
  }
  
  export const SellerInfo = ({ name, joinDate, avatar }: SellerInfoProps) => {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">На сайті з {joinDate}</p>
        </div>
      </div>
    );
  };