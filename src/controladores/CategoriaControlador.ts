import { Request, Response, Router } from '../config';
import { CategoriaModelo } from '../modelos/categoriaModelo';
import { CategoriaVista } from '../vistas/categoria/CategoriaVista';

export default class CategoriaControlador {

    /**
     * Atributos
     */
    public router: Router;
    private categoriaVista: CategoriaVista;
    private categoriaModelo: CategoriaModelo;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.categoriaVista = new CategoriaVista();
        this.categoriaModelo = new CategoriaModelo();
    }

    /**
     * retorna lista categoria
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async obtenerListaCategoria(request: Request, response: Response): Promise<void> {
        await this.categoriaVista.actualizarVistaCategoria(response);
    }

    /**
     * guarda la nueva categoria con el valor de "descripcion" de este objeto
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async registrarCategoria(request: Request, response: Response): Promise<void> {
        let { descripcion } = request.body;
        this.categoriaModelo.setDescripcion(descripcion);
        if (await this.categoriaModelo.registrarCategoria()) {
            await this.categoriaVista.actualizarVistaCategoria(response);
        }

    }

    /**
     * obtiene la vista de editar Cateoria
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerVistaEditarCategoria(request: Request, response: Response): Promise<void> {
        let { id_categoria } = request.params;
        await this.categoriaVista.obtenerVistaEditarCategoria(response, Number(id_categoria));
    }

    /**
     * modifica la descripcion de categoria
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarCategoria(request: Request, response: Response): Promise<void> {
        let { id_categoria } = request.params;
        let { descripcion } = request.body;
        this.categoriaModelo.setDescripcion(descripcion);
        this.categoriaModelo.setId(Number(id_categoria));
        if (await this.categoriaModelo.modificarCategoria()) {
            // modificacion de categoria correctamente
            this.categoriaVista.actualizarVistaCategoria(response);
        } else {
            // hubo errores en modificacion de categoria
            this.categoriaVista.actualizarVistaCategoria(response);
        }
    }

    /**
     * metodo privado para cargar las rutas que disponen en los metodos HTTP
     */
    private createRoutes(): void {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerListaCategoria(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarCategoria(req, res));
        this.router.route('/:id_categoria').get(async (req: Request, res: Response) => this.obtenerVistaEditarCategoria(req, res));
        this.router.route('/modificar/:id_categoria').put(async (req: Request, res: Response) => this.modificarCategoria(req, res));
    }
}