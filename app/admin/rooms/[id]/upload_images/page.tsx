import Error from "@/app/error";
import UploadRoomImages from "@/components/admin/UploadRoomImages";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Upload rooms images - ADMIN",
  description: "All rooms available in the system.",
};

const getRooms = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: {
      tags: ["RoomDetails"],
    },
  });
  return res.json();
};

export default async function AdminUploadRoomsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getRooms(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UploadRoomImages data={data} />;
}
