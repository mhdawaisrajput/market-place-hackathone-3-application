import { shipEngine } from "@/app/helper/shipEngine";
import { NextRequest } from "next/server";
export async function GET() {
  return new Response(JSON.stringify({ message: "Shipengine Testing" }));
}

export async function POST(req: NextRequest) {
  const { shipToAddress, packages } = await req.json();

  try {
    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipToAddress,
        shipFrom: {
          name: "Muhammad Awais",
          phone: "+92-123-4567890",
          addressLine1: "Address 1",
          addressLine2: "Address 2",
          cityLocality: "Karachi",
          stateProvince: "Sindh",
          postalCode: "62701",
          countryCode: "PK",
          addressResidentialIndicator: "no",
        },
        packages: packages,
      },
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER || "",
          process.env.SHIPENGINE_SECOND_COURIER || "",
          process.env.SHIPENGINE_THIRD_COURIER || "",
          process.env.SHIPENGINE_FOURTH_COURIER || "",
        ].filter(Boolean),
      },
    });

    return new Response(JSON.stringify(shipmentDetails), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error Occured" }), {
      status: 500,
    });
  }
}
