import RoomReviews from "@/components/admin/RoomReviews";

export const metadata = {
  title: "Room Reviews - BookIT",
  description:
    "BookIT is a platform to book rooms for your meetings and conferences.",
};

export default async function AdminRoomReviewsPage() {
  return <RoomReviews />;
}
