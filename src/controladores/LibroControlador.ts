/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

import { Request, Response, Router } from '../config';
import { LibroModelo } from "../modelos/LibroModelo";
import { LibroVista } from "../vistas/libro/LibroVista";

export class LibroControlador {
    /**
     * Atributos
     */
    public router: Router;
    private libroModelo: LibroModelo;
    private libroVista: LibroVista;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.libroModelo = new LibroModelo();
        this.libroVista = new LibroVista();
    }

    /**
     * retorna lista de libros
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async obtenerVistaLibros(request: Request, response: Response): Promise<void> {
        await this.libroVista.obtenerVistaLibro(response);
    }

    /**
     * guarda el nuevo libro con el valor de "{ codigo, autor, titulo, descripcion, edicion, stock, estado, id_categoria }" que recibe en el Objeto Request que entra por paramtero
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async registrarLibro(request: Request, response: Response): Promise<void> {
        let { autor, titulo, descripcion, edicion, stock, id_categoria } = request.body;
        this.libroModelo.setAutor(autor);
        this.libroModelo.setTitulo(titulo);
        this.libroModelo.setDescripcion(descripcion);
        this.libroModelo.setEdicion(edicion);
        this.libroModelo.setStock(stock);
        this.libroModelo.setIdCategoria(id_categoria);
        if (await this.libroModelo.registrarLibro()) {
            await this.libroVista.obtenerVistaLibro(response);
        }

    }

    /**
     * obtiene la vista de editar Libro
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerVistaEditarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        await this.libroVista.obtenerVistaEditarLibro(response, Number(codigo_libro));
    }

    /**
     * modifica los datos de un libro
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        let { autor, titulo, descripcion, edicion, stock, estado, id_categoria } = request.body;
        console.log(request.params, request.body);
        this.libroModelo.setCodigo(Number(codigo_libro));
        this.libroModelo.setAutor(autor);
        this.libroModelo.setTitulo(titulo);
        this.libroModelo.setDescripcion(descripcion);
        this.libroModelo.setEdicion(edicion);
        this.libroModelo.setStock(stock);
        this.libroModelo.setEstado(estado);
        this.libroModelo.setIdCategoria(id_categoria);
        if (await this.libroModelo.modificarLibro()) {
            // modificacion de libro correctamente
            this.libroVista.obtenerVistaLibro(response);
        } else {
            // hubo errores en modificacion de categoria
            this.libroVista.obtenerVistaLibro(response);
        }
    }

    /**
     * elimina un libro guradado en la BD
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async eliminarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        this.libroModelo.setCodigo(Number(codigo_libro));
        if (await this.libroModelo.eliminarLibro()) {
            this.libroVista.obtenerVistaLibro(response);
        } else {
            this.libroVista.obtenerVistaLibro(response);
        }
    }

    /**
     * Este proceso se encarga de habilitar o inhabilitar un libro espec??fico.
     * @param request : peticion HTTP
     * @param response : respuesta http
     */
    public async habilitarOInhabilitarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        this.libroModelo.setCodigo(Number(codigo_libro));
        if (await this.libroModelo.habilitarOInhabilitarLibro()) {
            this.libroVista.obtenerVistaLibro(response);
        } else {
            this.libroVista.obtenerVistaLibro(response);
        }
    }

    /**
     * metodo privado para cargar las rutas que disponen en los metodos HTTP
     */
    private createRoutes(): void {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerVistaLibros(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarLibro(req, res));
        this.router.route('/:codigo_libro').get(async (req: Request, res: Response) => this.obtenerVistaEditarLibro(req, res));
        this.router.route('/modificar/:codigo_libro').put(async (req: Request, res: Response) => this.modificarLibro(req, res));
        this.router.route('/eliminar/:codigo_libro').delete(async (req: Request, res: Response) => this.eliminarLibro(req, res));
        this.router.route('/habilitar_inhabilitar/:codigo_libro').put(async (req: Request, res: Response) => this.habilitarOInhabilitarLibro(req, res));
    }
}