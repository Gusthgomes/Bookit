import { dbConnect } from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/roomControllers";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticated, authorizeRoles("admin")).put(updateRoom);
router.use(isAuthenticated, authorizeRoles("admin")).delete(deleteRoom);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
