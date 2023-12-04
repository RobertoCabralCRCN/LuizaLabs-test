import { Router } from "express";

import { CreateOrderItemController } from "../modules/orders/use-cases/createItem/CreateItemController";
import { CreateOrderController } from "../modules/orders/use-cases/createOrder/CreateOrderController";
import { GetByIdOrderController } from "../modules/orders/use-cases/getById/GetByIdOrderController";
import { GetByUserOrderController } from "../modules/orders/use-cases/getByUser/GetByUserOrderController";
import multer from "multer";
import { ImportDataController } from "../modules/orders/use-cases/importData/ImportDataController";
import { GetAllOrdersController } from "../modules/orders/use-cases/getAll/GetAllOrdersController";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const createOrderItemController = new CreateOrderItemController();
const getByIdOrderController = new GetByIdOrderController();
const getByUserOrderController = new GetByUserOrderController();
const importDataController = new ImportDataController();
const getAllOrdersController = new GetAllOrdersController()

/* No Futuro seria interessante armazenar os arquivos em algum local
e manter um histórico dos arquivos importados para controle / auditoria */
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

ordersRoutes.post("/", createOrderController.handle);
ordersRoutes.get("/", getAllOrdersController.handle);
ordersRoutes.get("/:id", getByIdOrderController.handle);
ordersRoutes.get("/user/:id", getByUserOrderController.handle);

ordersRoutes.post("/item/", createOrderItemController.handle);

ordersRoutes.post("/import", upload.single('file'), importDataController.handle);


export { ordersRoutes };
