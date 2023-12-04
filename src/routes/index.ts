import { Router } from "express";

import { ordersRoutes } from "./orders.routes";
import { productRoutes } from "./products.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", ordersRoutes);

export { router };
