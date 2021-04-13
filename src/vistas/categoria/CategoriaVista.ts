import { Request, Response } from 'express';

export class CategoriaVista {

    public async getListaCategoria(request: Request, response: Response): Promise<void> {
        response.render('categoria/gestionar_categoria');
    }
}