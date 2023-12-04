import { Router } from "express";

import { CreateProductController } from "../modules/products/use-cases/create-product/CreateProductController";
import { DeleteProductController } from "../modules/products/use-cases/delete-product/DeleteProductController";
import { GetAllProductsController } from "../modules/products/use-cases/get-all-products/GetAllProductsController";
import { GetByIdProductController } from "../modules/products/use-cases/get-by-id-product/GetByIdProductController";
import { UpdateProductController } from "../modules/products/use-cases/update-product/UpdateProductController";

const productRoutes = Router();

const createProductController = new CreateProductController();
const getAllProductsController = new GetAllProductsController();
const getByIdProductController = new GetByIdProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productRoutes.post("/", createProductController.handle);
productRoutes.get("/", getAllProductsController.handle);
productRoutes.get("/:id", getByIdProductController.handle);
productRoutes.put("/:id", updateProductController.handle);
productRoutes.delete("/:id", deleteProductController.handle);

export { productRoutes };
