/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani
 * @version: 0.0.1
 * @since: 04-05-2021
 */

import { Request, Response, Router } from "../config";
import { UsuarioLectorModelo } from "../modelos/UsuarioLectorModelo";
import { UsuarioLectorVista } from "../vistas/usuario_lector/UsuarioLectorVista";

export class UsuarioLectorControlador {
    /**
     * Atributos
     */
    public router: Router;
    private usuarioLectorModelo: UsuarioLectorModelo;
    private usuarioLectorVista: UsuarioLectorVista;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.usuarioLectorModelo = new UsuarioLectorModelo();
        this.usuarioLectorVista = new UsuarioLectorVista();
    }

    /**
     * Obtiene la vista de Gestionar Usuario Lector
     */
    public async obtenerVistaUsuarioLector(request: Request, response: Response): Promise<void> {
        await this.usuarioLectorVista.obtenerVistaUsuarioLector(response);
    }

    /**
     * registra un nuevo usuario lector a la BD del software
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async registrarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci, nombre, apellidos, email, telefono } = request.body;
        this.usuarioLectorModelo.setCI(Number(ci));
        this.usuarioLectorModelo.setNombre(nombre);
        this.usuarioLectorModelo.setApellidos(apellidos);
        this.usuarioLectorModelo.setEmail(email);
        this.usuarioLectorModelo.setTelefono(telefono);
        if (await this.usuarioLectorModelo.registrarUsuarioLector()) {
            await this.usuarioLectorVista.obtenerVistaUsuarioLector(response);
        } else {
            await this.usuarioLectorVista.obtenerVistaUsuarioLector(response);
        }
    }

    /**
     * Este metodo obtiene la vista de editar usuario lector ya existente
     * @param request : peticion HTTP
     * @param response : respuesta http
     */
    public async obtenerVistaEditarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci_usuario_lector } = request.params;
        await this.usuarioLectorVista.obtenerVistaEditaUsuarioLector(response, Number(ci_usuario_lector));
    }

    /**
     * modifica los datos de un usuari lector ya existente
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci_usuario_lector } = request.params;
        let { nombre, apellidos, email, telefono } = request.body;
        this.usuarioLectorModelo.setCI(Number(ci_usuario_lector));
        this.usuarioLectorModelo.setNombre(nombre);
        this.usuarioLectorModelo.setApellidos(apellidos);
        this.usuarioLectorModelo.setEmail(email);
        this.usuarioLectorModelo.setTelefono(telefono);
        if (await this.usuarioLectorModelo.modificarUsuarioLector()) {
            // modificacion de libro correctamente
            this.usuarioLectorVista.obtenerVistaUsuarioLector(response);
        } else {
            // hubo errores en modificacion de categoria
            this.usuarioLectorVista.obtenerVistaUsuarioLector(response);
        }
    }

    private async createRoutes(): Promise<void> {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerVistaUsuarioLector(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarUsuarioLector(req, res));
        this.router.route('/:ci_usuario_lector').get(async (req: Request, res: Response) => this.obtenerVistaEditarUsuarioLector(req, res));
        this.router.route('/modificar/:ci_usuario_lector').put(async (req: Request, res: Response) => this.modificarUsuarioLector(req, res));
    }
}