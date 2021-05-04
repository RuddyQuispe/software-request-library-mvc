/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 04-05-2021
 */

import { Response } from "../../config";
import { UsuarioLectorModelo } from "../../modelos/UsuarioLectorModelo";

export class UsuarioLectorVista {

    /**
     * Atributos
     */
    private usuarioLectorModelo: UsuarioLectorModelo;

    /**
     * Constructor
     */
    constructor() {
        this.usuarioLectorModelo = new UsuarioLectorModelo();
    }

    /**
     * actualiza la vista gestionar usuario Lectores
     * @param response : respuesta HTTP
     */
    public async obtenerVistaUsuarioLector(response: Response): Promise<void> {
        let listaDeUsuariosLectores = await this.usuarioLectorModelo.obtenerListaUsuariosLectores();
        response.render('usuario_lector/gestionar_usuario_lector', {
            lista_usuarios: listaDeUsuariosLectores
        });
    }

    /**
     * devuelve la vista de editar los datos del usuario Lector y obtiene los datos del mismo
     * @param response : respuesta HTTP
     * @param ciUsuarioLector : CI del usuario Lector
     */
    public async obtenerVistaEditaUsuarioLector(response: Response, ciUsuarioLector: number): Promise<void> {
        this.usuarioLectorModelo.setCI(ciUsuarioLector);
        let datosDeUsuarioLector: { ci: number, nombre: string, apellidos: string, email: string, telefono: string } = await this.usuarioLectorModelo.obtenerDatosUsuarioLector();
        response.status(200).render('usuario_lector/editar_usuario_lector', datosDeUsuarioLector);
    }
}