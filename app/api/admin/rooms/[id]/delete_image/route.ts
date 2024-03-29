import { dbConnect } from "@/backend/config/dbConnect";
import { deleteRoomImages } from "@/backend/controllers/roomControllers";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

route.use(isAuthenticated, authorizeRoles("admin")).put(deleteRoomImages);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}
