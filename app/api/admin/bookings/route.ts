import { dbConnect } from "@/backend/config/dbConnect";
import { allAdminBookings } from "@/backend/controllers/bookingController";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

route.use(isAuthenticated, authorizeRoles("admin")).get(allAdminBookings);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}
