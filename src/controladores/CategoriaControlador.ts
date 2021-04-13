import { Request, Response, Router } from 'express';
import { CategoriaVista } from '../vistas/categoria/CategoriaVista';

export default class CategoriaControlador {
    public router: Router;
    private categoriaVista: CategoriaVista;

    constructor() {
        this.router = Router();
        this.createRoutes();
        this.categoriaVista = new CategoriaVista();
    }

    public async obtenerListaCategoria(request: Request, response: Response): Promise<void> {
        await this.categoriaVista.getListaCategoria(request, response);
    }

    private createRoutes() {
        this.router.route('/').get((req: Request, res: Response) => this.obtenerListaCategoria(req, res));
        // this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        // this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        // this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        // this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }
}