"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import Link from "next/link";
import StaticHeader from "@/components/static_header";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  if (!clientSecret) {
    return <div>Loading...</div>
  }

  return (
    <>
      <StaticHeader />

      <div
        style={{ maxWidth: 400, minWidth:100, margin: "0 auto" }}
        className="rounded-lg p-4 shadow-md "
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Payment Detail
        </h1>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>
    </>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      setErrorMessage(null);
      alert("Payment successful!");
      setIsPaymentSuccessful(true);
      setIsProcessing(false);
    } else {
      setErrorMessage("Payment not completed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="w-full px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 shadow-sm mt-4"
        type="submit"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && (
        <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>
      )}

      {isPaymentSuccessful ? (
        <Link href="/userDashboard">
          <button className="w-full px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 shadow-sm mt-4">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        <p className="mt-4 text-red-600">
          Please complete the payment to access the dashboard.
        </p>
      )}
    </form>
  );
}
