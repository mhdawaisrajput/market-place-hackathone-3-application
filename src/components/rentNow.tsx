import { useAuth } from "@clerk/nextjs";

export default function RentNowButton() {
  const { isSignedIn } = useAuth();

  const handleRentNowClick = () => {
    if (isSignedIn) {
      // Open the billing page in the same window
      window.location.href = "/billingPage";
    } else {
      // Prepare the sign-in URL with the current location as the redirect_url
      const signInUrl = "https://apparent-escargot-65.accounts.dev/sign-in";
      const redirectUrl = encodeURIComponent(window.location.href);
      const fullUrl = `${signInUrl}?redirect_url=${redirectUrl}`;

      // Open the sign-in page in the same window
      window.location.href = fullUrl;
    }
  };

  return (
    <button
      onClick={handleRentNowClick}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md transition-all duration-300"
    >
      Rent Now
    </button>
  );
}
