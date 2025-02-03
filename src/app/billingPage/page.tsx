"use client";

import Header from "@/components/header";
import StaticHeader from "@/components/static_header";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ShippingForm() {
  const getName = useRef<HTMLInputElement>(null);
  const getPhone = useRef<HTMLInputElement>(null);
  const getAddressLine1 = useRef<HTMLInputElement>(null);
  const getAddressLine2 = useRef<HTMLInputElement>(null);
  const getCityLocality = useRef<HTMLInputElement>(null);
  const getStateProvince = useRef<HTMLInputElement>(null);
  const getPostalCode = useRef<HTMLInputElement>(null);
  const getCountryCode = useRef<HTMLInputElement>(null);
  const getAddressResidentialIndicator = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payLoad = {
      shipToAddress: {
        name: getName.current?.value,
        phone: getPhone.current?.value,
        addressLine1: getAddressLine1.current?.value,
        addressLine2: getAddressLine2.current?.value,
        cityLocality: getCityLocality.current?.value,
        stateProvince: getStateProvince.current?.value,
        postalCode: getPostalCode.current?.value,
        countryCode: getCountryCode.current?.value,
        addressResidentialIndicator:
          getAddressResidentialIndicator.current?.value,
      },
    };

    try {
      const res = await fetch("/api/shipengine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
      });
      const data = await res.json();
      console.log("Response from Api", data);

      // Call Sanity submission
      onSubmitSanity();
    } catch (error) {
      console.log("Error");
    }
  };

  const onSubmitSanity = async () => {
    const doc = {
      _type: "shipment",
      shipTo: {
        name: getName.current?.value,
        phone: getPhone.current?.value,
        addressLine1: getAddressLine1.current?.value,
        addressLine2: getAddressLine2.current?.value,
        cityLocality: getCityLocality.current?.value,
        stateProvince: getStateProvince.current?.value,
        postalCode: getPostalCode.current?.value,
        countryCode: getCountryCode.current?.value,
        addressResidentialIndicator:
          getAddressResidentialIndicator.current?.value,
      },
    };

    try {
      const result = await client.create(doc);
      console.log("Sanity submission success:", result);
    } catch (error) {
      console.error("Error submitting to Sanity:", error);
    }
  };

  return (
    <>
      <StaticHeader />
      <div className="max-w-screen-2xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Shipping Form */}
          <div className="bg-white p-8 shadow-lg rounded-3xl">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              Shipping Form
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  Ship To Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Name", placeholder: "Enter Name", ref: getName },
                    {
                      label: "Phone",
                      placeholder: "Enter Phone",
                      ref: getPhone,
                    },
                    {
                      label: "Address Line 1",
                      placeholder: "Enter Address Line 1",
                      ref: getAddressLine1,
                    },
                    {
                      label: "Address Line 2",
                      placeholder: "Enter Address Line 2",
                      ref: getAddressLine2,
                    },
                    {
                      label: "City/Locality",
                      placeholder: "Enter City/Locality",
                      ref: getCityLocality,
                    },
                    {
                      label: "State/Province",
                      placeholder: "Enter State/Province",
                      ref: getStateProvince,
                    },
                    {
                      label: "Postal Code",
                      placeholder: "Enter Postal Code",
                      ref: getPostalCode,
                    },
                    {
                      label: "Country Code",
                      placeholder: "Enter Country Code",
                      ref: getCountryCode,
                    },
                    {
                      label: "Residential Indicator",
                      placeholder: "Enter Residential Indicator",
                      ref: getAddressResidentialIndicator,
                    },
                  ].map(({ label, placeholder, ref }, index) => (
                    <div className="mb-6" key={index}>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        ref={ref}
                        placeholder={placeholder}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side: Image Section */}

          <div>
            <Image
              src="/rentalsummary.png"
              alt="Rental Summary"
              layout="responsive"
              width={496}
              height={560}
              className="w-full h-full"
            />
            <Link href="/payment">
              <button className=" mt-4 w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300">
                Proceed to Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
