import { dbConnect } from "@/backend/config/dbConnect";
import { allAdminRooms, newRoom } from "@/backend/controllers/roomControllers";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

route.use(isAuthenticated, authorizeRoles("admin")).post(newRoom);
route.use(isAuthenticated, authorizeRoles("admin")).get(allAdminRooms);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}

export async function GET(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}
