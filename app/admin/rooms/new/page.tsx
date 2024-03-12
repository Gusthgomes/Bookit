import NewRoom from "@/components/admin/NewRoom";

export const metadata = {
  title: "Create new rooms - ADMIN",
  description: "Create new rooms in the system.",
};

export default async function NewRoomPage() {
  return <NewRoom />;
}
