import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import Booking, { IBooking } from "../models/Booking";


// Create new booking => /api/bookings
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
    });

    return NextResponse.json({
        booking,
    })
    
});

// check Room Booking Availability => /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const roomId = searchParams.get('roomId');

    const checkInDate = new Date(searchParams.get('checkInDate') as string);
    const checkOutDate = new Date(searchParams.get('checkOutDate') as string);

    const bookings: IBooking[] = await Booking.find({
        room: roomId,
        $and: [
            { checkInDate: { $lte: checkOutDate } },
            { checkOutDate: { $gte: checkInDate } }
        ],
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
        isAvailable,
    })
    
});