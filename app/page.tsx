import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "Home - BookIT",
  description:
    "BookIT is a platform to book rooms for your meetings and conferences.",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`);
  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
