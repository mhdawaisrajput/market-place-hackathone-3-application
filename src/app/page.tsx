"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/header";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

// Define the Car interface for type safety
interface Car {
  _id: string;
  name: string;
  type: string;
  image?: any; // You might refine this type based on your image schema
  fuelCapacity?: number;
  transmission?: string;
  seatingCapacity?: number;
  pricePerDay?: number;
}

const HomePage = () => {
  // const [cars, setCars] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  // const [showWishlist, setShowWishlist] = useState(false);

  const [cars, setCars] = useState<Car[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
    const [showWishlist, setShowWishlist] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     const result = await client.fetch('*[_type == "car"]');
  //     setCars(result);
  //   };
  //   fetchCars();
  // }, []);



  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await client.fetch('*[_type == "car"]');
        // Explicitly check if the returned array is empty
        if (!result || result.length === 0) {
          throw new Error(" No cars found. Please try again later. If the issue persists, it might be a temporary problem with the server or data fetching.");
        }
        setCars(result);
      } catch (err: unknown) {
        console.error("Failed to fetch cars:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    fetchCars();
  }, []);





  const filteredCars = cars.filter(
    (car: any) =>
      car.name?.toLowerCase().includes(searchTerm) ||
      car.type?.toLowerCase().includes(searchTerm)
  );

  const toggleFavorite = (carId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [carId]: !prevFavorites[carId],
    }));
  };

  const toggleWishlist = () => {
    setShowWishlist((prev) => !prev);
  };

  const wishlistCars = cars.filter((car: any) => favorites[car._id]);

  return (
    <>
      <Header
        setSearchTerm={setSearchTerm}
        toggleWishlist={toggleWishlist}
        wishlistCount={wishlistCars.length} // Pass wishlist count
      />

      {/* Error UI below */}
      {error && (
        <div className="flex justify-center items-center py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {showWishlist ? (
        <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-screen-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-gray-900">
            Your Wishlist 🚘
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistCars.length > 0 ? (
              wishlistCars.map((car: any) => (
                <div
                  key={car._id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800 truncate">
                        {car.name}
                      </h2>
                      <Heart
                        className={`cursor-pointer ${
                          favorites[car._id]
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => toggleFavorite(car._id)}
                      />
                    </div>
                    <p className="text-md font-semibold text-blue-500 capitalize">
                      {car.type}
                    </p>
                    {car.image && (
                      <Image
                        src={urlFor(car.image).url()}
                        alt={car._id}
                        width={250}
                        height={40}
                        className="my-10 mx-auto object-cover rounded-lg"
                      />
                    )}

                    <div className="flex justify-between font-semibold text-gray-600 mt-4">
                      <p className="text-sm">⛽{car.fuelCapacity}</p>
                      <p className="text-sm capitalize">⚙️{car.transmission}</p>
                      <p className="text-sm">🧑{car.seatingCapacity}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <h1 className="text-xl font-extrabold text-black">
                        {car.pricePerDay}/
                        <span className="text-sm font-medium text-gray-500 mt-2">
                          day
                        </span>
                      </h1>
                      <Link href={`/cars/${car._id}`}>
                        <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 shadow-sm">
                          View Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No cars in your wishlist</p>
            )}
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8  mx-auto max-w-screen-2xl">
          <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-screen-2xl">
            <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:gap-x-4 justify-center items-center mb-6">
              <Image
                src="/ads1.png"
                alt="ads1"
                width={850}
                height={100}
                className="w-full sm:w-100 h-auto"
              />
              <Image
                src="/ads2.png"
                alt="ads2"
                width={850}
                height={100}
                className="w-full sm:w-100 h-auto"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-gray-900">
            Explore Our Latest Cars 🚘
          </h1>

          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCars.length > 0 ? (
              filteredCars.map((car: any) => (
                <div
                  key={car._id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800 truncate">
                        {car.name}
                      </h2>
                      <Heart
                        className={`cursor-pointer ${
                          favorites[car._id]
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => toggleFavorite(car._id)}
                      />
                    </div>
                    <p className="text-md font-semibold text-blue-500 capitalize">
                      {car.type}
                    </p>
                    {car.image && (
                      <Image
                        src={urlFor(car.image).url()}
                        alt={car._id}
                        width={250}
                        height={40}
                        className="my-10 mx-auto object-cover rounded-lg"
                      />
                    )}

                    <div className="flex justify-between font-semibold text-gray-600 mt-4">
                      <p className="text-sm">⛽{car.fuelCapacity}</p>
                      <p className="text-sm capitalize">⚙️{car.transmission}</p>
                      <p className="text-sm">🧑{car.seatingCapacity}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <h1 className="text-xl font-extrabold text-black">
                        {car.pricePerDay}/
                        <span className="text-sm font-medium text-gray-500 mt-2">
                          day
                        </span>
                      </h1>
                      <Link href={`/cars/${car._id}`}>
                        <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 shadow-sm">
                          View Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>{searchTerm}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
