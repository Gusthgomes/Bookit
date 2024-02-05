import React from 'react'
import { IRoom } from '@/backend/models/Room';
import RoomImageSlider from './RoomImageSlider';
import RoomFeatures from './RoomFeatures';
import BookingDatePicker from './BookingDatePicker';
import ListReview from '../review/ListReview';
import NewReview from '../review/NewReview';

interface Props {
    data: {
        room: IRoom
    }

}
const RoomDetails = ({ data }: Props) => {

    const { room } = data;
    return (
        <div className="container container-fluid">
        <h2 className="mt-5">{ room.name }</h2>
        <p>{ room.address }</p>

        <RoomImageSlider images={room?.images} />

        <div className="row my-5">
            <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>
                { room.description }
            </p>

            <RoomFeatures room={ room }/>
            
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <BookingDatePicker room ={ room} />
            </div>
        </div>
        <NewReview/>
        <ListReview/>
        </div>
    )
}

export default RoomDetails
