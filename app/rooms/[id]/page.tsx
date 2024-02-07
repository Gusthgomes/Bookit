import Error from "@/app/error";
import RoomDetails from "@/components/room/RoomDetails";

type Props = {
    params: {
        id: string;
    };
};

const getRoom = async (id: string) => {
    const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`);
    return res.json();
}

export default async function RoomsDetailsPage({ params }: Props) {
    const data = await getRoom(params?.id);

    if(data?.message){
        return <Error error={ data }/>
    }

    return <RoomDetails data={ data }/>
}

export async function generateMetadata({ params }: Props) {
    const data = await getRoom(params?.id);

    return {
        title: data?.room?.name,
    }
}