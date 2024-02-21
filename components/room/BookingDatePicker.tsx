'use client';
import { IRoom } from '@/backend/models/Room'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
    room: IRoom
}

const BookingDatePicker = ({ room }: Props) => {

    const [ checkInDate, setCheckInDate ] = useState(new Date())
    const [ checkOutDate, setCheckOutDate ] = useState(new Date())

    const onChange = (dates: Date[]) => {
        const [ checkInDate, checkOutDate ] = dates;
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);

        if(checkInDate && checkOutDate) {
            console.log('checkInDate:', checkInDate);
            console.log('checkOutDate:', checkOutDate);
            // check booking availability
        }
    };

    return (
        <div className='booking-card shadow p-4'>
            <p className='price-per-night'>
                <b>${room?.pricePerNight}</b> / night
            </p>

            <hr/>

            <p className='mt5 mb-3'>
                Pick Check In & Check Out Date
            </p>

            <DatePicker
                className='w-100'
                selected={checkInDate}
                onChange={ onChange }
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                selectsRange
                inline
            />

        </div>
    )
}

export default BookingDatePicker
