import { dbConnect } from "@/backend/config/dbConnect";
import { getRoomBookedDates } from "@/backend/controllers/bookingController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.get(getRoomBookedDates)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}
