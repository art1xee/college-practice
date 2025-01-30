import React, { useEffect, useState } from "react";
import LoadingSpinner from "./loading";

interface CurrentUserImage {
    image: string;
    name: string;
  }

const CurrentUserImage:  React.FC = () => {
  const [user, setUser] = useState<CurrentUserImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch("/api/user");
            if (!response.ok) {
              throw new Error("Failed to fetch user data.");
            }
    
            const data: CurrentUserImage = await response.json();
            setUser(data);
          } catch (err) {
            setError((err as Error).message || "Something went wrong.");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchUserData();
      }, []);
    
      if (isLoading) {
        return <LoadingSpinner />;
      }
    

    return (
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-orange-500">
        {(user?.image ?? "") ? (
          <img
            src={user?.image as string} 
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
          ) : (
             <span className="text-white text-2xl font-bold">
             {user?.name?.[0]?.toUpperCase() || "U"} 
             </span>
          )}
        </div>
    );
};

export default CurrentUserImage;