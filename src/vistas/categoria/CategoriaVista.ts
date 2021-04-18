import { Response } from '../../config';
import { CategoriaModelo } from '../../modelos/categoriaModelo';

export class CategoriaVista {

    /**
     * Atributos
     */
    private categoriaModelo: CategoriaModelo;

    /**
     * Constructor
     */
    constructor() {
        this.categoriaModelo = new CategoriaModelo();
    }

    /**
     * actualiza la vista gestionar categoria
     * @param response : respuesta HTTP
     */
    public async actualizarVistaCategoria(response: Response): Promise<void> {
        let listaCategoria = await this.categoriaModelo.obtenerListaCategorias();
        response.render('categoria/gestionar_categoria', {
            lista_categorias: listaCategoria
        });
    }

    /**
     * devuelve la vista de editar categoria y obtiene los datos de la categoria a editar
     * @param response : respuesta HTTP
     * @param idCategoria : id categoria a editar
     */
    public async obtenerVistaEditarCategoria(response: Response, idCategoria: number): Promise<void> {
        this.categoriaModelo.setId(idCategoria);
        let datosDeCategoria: { id: number, descripcion: string } | undefined = await this.categoriaModelo.obtenerDatosDeCategoria();
        if (datosDeCategoria) {
            // si existe categoria y los obtuvo
            response.status(200).render('categoria/editar_categoria', {
                id_categoria: datosDeCategoria.id,
                descripcion: datosDeCategoria.descripcion
            });
        } else {
            // si no existe categoria con el idCategoria (undefined)
            response.status(200).render('categoria/editar_categoria', {
                id_categoria: -1,
                descripcion: "none"
            });
        }
    }
}