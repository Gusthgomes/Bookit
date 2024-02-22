'use client';

import { IBooking } from '@/backend/models/Booking';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import React from 'react';

interface Props {
    data: {
        bookings: IBooking[];
    }
}

const MyBookings = ({ data }: Props ) => {

    const bookings = data?.bookings;

    const setBookings = () => {
        const data: { columns: any[], rows: any[] } = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Check In',
                    field: 'checkIn',
                    sort: 'asc'
                },
                {
                    label: 'Check Out',
                    field: 'checkOut',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        bookings?.forEach( (booking) => {
            data?.rows?.push({
                id: booking._id,
                checkIn: new Date(booking?.checkInDate).toLocaleDateString('en-US'),
                checkOut: new Date(booking?.checkOutDate).toLocaleDateString('en-US'),
                amount: `$${booking?.amountPaid}`,
                actions: (
                    <>
                        <Link href={`/bookings/${booking._id}`} className='btn btn-primary'>
                            {''}
                            <i className='fa fa-eye'></i>{''}
                        </Link>

                        <Link href={`/bookings/invoice/${booking._id}`} className='btn btn-success ms-2'>
                            {''}
                            <i className='fa fa-receipt'></i>{''}
                        </Link>
                    </>
                )
            })
        })

        return data;
    };

    return (
        <div className='container'>
            <h1 className='my-5'>My Bookings</h1>
            <MDBDataTable
                data={ setBookings() }
                className='px-3'
                bordered
                striped
                hover
            />
        </div>
    );
};

export default MyBookings