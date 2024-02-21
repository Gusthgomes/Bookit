import { dbConnect } from "@/backend/config/dbConnect";
import { checkRoomBookingAvailability } from "@/backend/controllers/bookingController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.get(checkRoomBookingAvailability);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}
