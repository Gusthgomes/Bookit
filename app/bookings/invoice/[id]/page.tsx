import Error from "@/app/error";
import Invoice from "@/components/invoice/invoice";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Booking Invoice",
  description: "View your bookings on BookIT",
};

const getBookings = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,
    authHeader
  );

  return res.json();
};

export default async function MyBookingsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBookings(params.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Invoice data={data} />;
}
