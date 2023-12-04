import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ImportDataUseCase } from "./ImportDataUseCase";

class ImportDataController {
  async handle(request: Request, response: Response): Promise<Response> {

    if (!request.file) {
        throw new AppError('Nenhum arquivo encontrado', 400);
    }   

    const fileContent = request.file.buffer.toString('utf-8');    

    const importDataUseCase = container.resolve(ImportDataUseCase);

    await importDataUseCase.execute(fileContent);

    return response.status(200).send({message: "Registros importados com sucesso"});
  }
}

export { ImportDataController };
