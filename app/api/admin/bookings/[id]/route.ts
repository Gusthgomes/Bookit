import { dbConnect } from "@/backend/config/dbConnect";
import { deleteBooking } from "@/backend/controllers/bookingController";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const route = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

route.use(isAuthenticated, authorizeRoles("admin")).delete(deleteBooking);

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}
