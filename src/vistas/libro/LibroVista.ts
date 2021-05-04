/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

import { Response } from '../../config';
import { CategoriaModelo } from "../../modelos/categoriaModelo";
import { LibroModelo } from "../../modelos/LibroModelo";

export class LibroVista {
    /**
     * Atributo
     */
    private libroModelo: LibroModelo;
    private categoriaModelo: CategoriaModelo;

    constructor() {
        this.libroModelo = new LibroModelo();
        this.categoriaModelo = new CategoriaModelo();
    }

    /**
     * actualiza la vista gestionar libro
     * @param response : respuesta HTTP
     */
    public async obtenerVistaLibro(response: Response): Promise<void> {
        let listaLibros = await this.libroModelo.obtenerListaLibros();
        let listaCategorias = await this.categoriaModelo.obtenerListaCategorias();
        response.render('libro/gestionar_libro', {
            lista_libro: listaLibros,
            lista_categorias: listaCategorias
        });
    }

    /**
     * devuelve la vista de editar categoria y obtiene los datos de la categoria a editar
     * @param response : respuesta HTTP
     * @param idCategoria : id categoria a editar
     */
    public async obtenerVistaEditarLibro(response: Response, codigoLibro: number): Promise<void> {
        this.libroModelo.setCodigo(codigoLibro);
        let datosDeLibro: { codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, id_categoria: number } | undefined = await this.libroModelo.obtenerDatosDeLibro();
        let listaCategorias = await this.categoriaModelo.obtenerListaCategorias();
        if (datosDeLibro) {
            // si existe categoria y los obtuvo
            response.status(200).render('libro/editar_libro', {
                codigo: datosDeLibro.codigo,
                autor: datosDeLibro.autor,
                titulo: datosDeLibro.titulo,
                descripcion: datosDeLibro.descripcion,
                edicion: datosDeLibro.edicion,
                stock: datosDeLibro.stock,
                estado: datosDeLibro.estado,
                id_categoria: datosDeLibro.id_categoria,
                lista_categorias: listaCategorias
            });
        } else {
            // si no existe categoria con el idCategoria (undefined)
            response.status(200).render('categoria/editar_libro', {
                codigo: 0,
                autor: "none",
                titulo: "none",
                descripcion: "none",
                edicion: "none",
                stock: -1,
                estado: false,
                id_categoria: 0,
                lista_categorias: listaCategorias
            });
        }
    }
}