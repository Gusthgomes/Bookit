import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import Booking, { IBooking } from "../models/Booking";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

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
  });
});

// Check Room Booking Availability => /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    const checkInDate = new Date(searchParams.get("checkInDate") as string);
    const checkOutDate = new Date(searchParams.get("checkOutDate") as string);

    const bookings: IBooking[] = await Booking.find({
      room: roomId,
      $and: [
        { checkInDate: { $lte: checkOutDate } },
        { checkOutDate: { $gte: checkInDate } },
      ],
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
      isAvailable,
    });
  }
);

// Get room booked dates => /api/bookings/get_booked_dates
export const getRoomBookedDates = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({ room: roomId });

  const bookedDates = bookings.flatMap((booking) =>
    Array.from(
      moment
        .range(moment(booking.checkInDate), moment(booking.checkOutDate))
        .by("day")
    )
  );

  return NextResponse.json({
    bookedDates,
  });
});

// Get current user bookings => /api/bookings/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id });

  return NextResponse.json({
    bookings,
  });
});

// Get booking details => /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate("user");

    if (booking.user?._id?.toString() !== req.user._id) {
      throw new ErrorHandler("You can not view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);

// Get sales stats => /api/admin/bookings/sales_stats
export const getSalesStats = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(29, 59, 59, 999);

  const bookings = await Booking.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const numberOfBookings = bookings.length;
  const totalSales = bookings.reduce(
    (acc, booking) => acc + booking.amountPaid,
    0
  );

  return NextResponse.json({
    numberOfBookings,
    totalSales,
  });
});
