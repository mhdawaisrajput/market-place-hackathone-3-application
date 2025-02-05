"use client";

import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import RentNowButton from "@/components/rentNow";
import { Heart } from "lucide-react";
import Image from "next/image";

interface Params {
  params: {
    slug: string;
  };
}

interface CarType {
  name: string;
  _id: string;
  fuelCapacity: string;
  image: { _type: string; asset: object };
  brand: string;
  type: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  tags: string[];
}

export default function DynamicPage({ params }: Params) {
  const [cars, setCars] = useState<CarType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [carData, setCarData] = useState<CarType | null>(null);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [showWishlist, setShowWishlist] = useState(false);

  // State for filter options
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300); // Changed default max price

  useEffect(() => {
    const fetchCars = async () => {
      const result = await client.fetch('*[_type == "car"][0...16]');
      setCars(result); // Set the fetched data to state
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchCarData = async () => {
      const res = await client.fetch('*[_type == "car"]');
      const car = res.find((car: any) => car._id === params.slug);
      if (car) {
        setCarData(car);
      } else {
        notFound();
      }
    };
    fetchCarData();
  }, [params.slug]);

  if (!carData) {
    return null; // Or loading spinner
  }

  // Combined filter: search term, type, category, and price range
  const combinedFilteredCars = cars.filter((car: CarType) => {
    const matchesSearch =
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(car.type);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(car.seatingCapacity);
    const matchesPrice =
      parseFloat(car.pricePerDay.replace("$", "")) <= maxPrice;

    return matchesSearch && matchesType && matchesCategory && matchesPrice;
  });

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleFavorite = (carId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [carId]: !prevFavorites[carId],
    }));
  };

  const toggleWishlist = () => {
    setShowWishlist((prev) => !prev);
  };

  const wishlistCars = cars.filter((car: CarType) => favorites[car._id]);

  return (
    <>
      <Header
        setSearchTerm={setSearchTerm}
        toggleWishlist={toggleWishlist}
        wishlistCount={wishlistCars.length} // Pass wishlist count
      />

      <div className="flex gap-x-4 mx-auto max-w-screen-2xl">
        {/* Left Menu Bar */}
        <div className="hidden lg:block w-1/4 p-10 bg-white">
          {/* Type Section */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-sm text-[#90A3BF] mb-4">
              TYPE
            </h2>
            <div className="flex flex-col gap-4">
              {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map(
                (type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`checkBox-${type}`}
                      className="w-4 h-4"
                      onChange={() => handleTypeChange(type)}
                    />
                    <label
                      htmlFor={`checkBox-${type}`}
                      className="text-lg font-semibold text-[#1A202C]"
                    >
                      {type}{" "}
                      <span className="text-[#90A3BF]">
                        ({cars.filter((car) => car.type === type).length})
                      </span>
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-sm text-[#90A3BF] mb-4">
              CATEGORY
            </h2>
            <div className="flex flex-col gap-4">
              {["2 People", "4 People", "6 People", "5 seats", "4 seats"].map(
                (category) => (
                  <div key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`checkBox-${category}`}
                      className="w-4 h-4"
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`checkBox-${category}`}
                      className="text-lg font-semibold text-[#1A202C]"
                    >
                      {category}{" "}
                      <span className="text-[#90A3BF]">
                        (
                        {
                          cars.filter((car) => car.seatingCapacity === category)
                            .length
                        }
                        )
                      </span>
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-sm text-[#90A3BF] mb-4">
              PRICE
            </h2>
            <div className="flex flex-col">
              <input
                type="range"
                id="priceRange"
                className="w-full h-3"
                min="0"
                max="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <h2 className="text-lg font-semibold text-[#596780] pt-4">
                Max. ${maxPrice}
              </h2>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="px-6">
          {/* Single Car Detail */}
          <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row items-start gap-8">
            {/* Car Image Section */}
            {carData.image && (
              <div className="flex-shrink-0 w-full md:w-1/2 overflow-hidden rounded-xl shadow-md">
                <Image
                width={490} height={380}
                  src={urlFor(carData.image).url()}
                  alt={carData.name}
                  className="w-[490px] h-[380px] rounded-lg"
                />
              </div>
            )}

            {/* Car Details Section */}
            <div className="flex-grow bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              {/* Car Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {carData.name}
              </h1>

              {/* Car Brand */}
              <h2 className="text-xl font-medium text-gray-600 mb-4 flex items-center">
                <span className="mr-2">🚘</span> Brand: {carData.brand}
              </h2>

              {/* Car Details List */}
              <ul className="space-y-3 text-gray-700 mb-6 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">🏷️</span> Type: {carData.type}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🧑</span> Seating Capacity:{" "}
                  {carData.seatingCapacity}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚙️</span> Transmission:{" "}
                  {carData.transmission}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⛽</span> Fuel Capacity:{" "}
                  {carData.fuelCapacity}
                </li>
                <li className="flex items-center font-semibold text-gray-800">
                  <span className="mr-2">💰</span> Price per Day:{" "}
                  {carData.pricePerDay}
                </li>
              </ul>

              {/* Rent Now Button */}
              <div className="flex justify-start">
                <RentNowButton />
              </div>
            </div>
          </div>

          {/* Grid of Filtered Cars */}
          {showWishlist ? (
            <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-screen-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-gray-900">
                Your Wishlist 🚘
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {wishlistCars.length > 0 ? (
                  wishlistCars.map((car: CarType) => (
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
                            className="my-10 rounded-lg"
                          />
                        )}

                        <div className="flex justify-between font-semibold text-gray-600 mt-4">
                          <p className="text-sm">⛽{car.fuelCapacity}</p>
                          <p className="text-sm capitalize">
                            ⚙️{car.transmission}
                          </p>
                          <p className="text-sm">🧑{car.seatingCapacity}</p>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <h1 className="text-xl font-extrabold text-black">
                            {car.pricePerDay}/
                            <span className="text-sm font-medium text-gray-500 mt-2">
                              day
                            </span>
                          </h1>
                          <RentNowButton />
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
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Recent Cars</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {combinedFilteredCars.map((car: CarType) => (
                  <div
                    key={car._id}
                    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 truncate">
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

                      <p className="text-sm font-semibold text-blue-500 capitalize">
                        {car.type}
                      </p>
                      {car.image && (
                        <Image
                          src={urlFor(car.image).url()}
                          alt={car._id}
                          width={250}
                          height={40}
                          className="my-3 mx-auto object-cover rounded-lg"
                        />
                      )}

                      <div className="flex justify-between font-semibold text-gray-600 mt-4">
                        <p className="text-xs">⛽{car.fuelCapacity}</p>
                        <p className="text-xs capitalize">
                          ⚙️{car.transmission}
                        </p>
                        <p className="text-xs">🧑{car.seatingCapacity}</p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <h1 className="text-md font-extrabold text-black">
                          {car.pricePerDay}
                        </h1>
                        <RentNowButton />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
