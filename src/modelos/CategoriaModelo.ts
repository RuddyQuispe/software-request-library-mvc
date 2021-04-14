import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";

export class CategoriaModelo {
    /**
     * Atributos
     */
    private id: number;
    private descripcion: string;
    /**
     * Conexiono a la BD
     */
    private conexionDatabase: Conexion;

    /**
     * Constructor
     * @param id : identificador de la categoria
     * @param descripcion : descripcion de la categoria
     */
    constructor(id?: number, descripcion?: string) {
        this.id = id ? id : 0;
        this.descripcion = descripcion ? descripcion : "";
        this.conexionDatabase = Conexion.getInstancia();
    }

    /**
     * Setters y Getters
     */
    public setId(id: number): void {
        this.id = id;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getId(): number {
        return this.id;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    /**
     * registrar a la BD la categoria
     * @returns true: si se registro correctamente - false: si hubo error al registrar y no se registro
     */
    public async registrarCategoria(): Promise<boolean> {
        try {
            let resultado: QueryResult | undefined = await this.conexionDatabase.ejecutarConsultaSQL(`insert into categoria(descripcion) values ('${this.descripcion}')`);
            return resultado !== undefined;
        } catch (error) {
            console.log("Error en metodo registrarCategoria", error);
            return false;
        }
    }

    /**
     * obtener listas de categorias de libros guardados
     * @returns lista de categorias o undefinde si ocurrio un error
     */
    public async obtenerListaCategorias(): Promise<any[] | undefined> {
        try {
            let resultado: QueryResult | undefined = await this.conexionDatabase.ejecutarConsultaSQL(`select id, descripcion from categoria order by id`);
            return resultado?.rows;
        } catch (error) {
            console.log("Error en metodo obtenerListaCategorias", error);
            return undefined;
        }
    }

    /**
     * Devuelve el id y descripcion de la categoria con el id de la instancia del objeto (this.id)
     * @returns any[]: datos de la categoria - undefined: si no encontro la categoria o si hubo error
     */
    public async obtenerDatosDeCategoria(): Promise<{ id: number, descripcion: string } | undefined> {
        try {
            let datosDeCategoria: QueryResult = await this.conexionDatabase.ejecutarConsultaSQL(`select * from categoria where id=${this.id}`);
            if (datosDeCategoria.rowCount > 0) {
                return {
                    id: datosDeCategoria.rows[0].id,
                    descripcion: datosDeCategoria.rows[0].descripcion
                }
            } else {
                return undefined;
            }
        } catch (error) {
            console.log("Error en metodo obtenerDatosDeCategoria", error);
            return undefined;
        }
    }

    /**
     * modifica la descripcion (this.descripcion) de la categoria con id (this.id)
     * @returns true: si modifico categoria - false si hubo problemas a modificar
     */
    public async modificarCategoria(): Promise<boolean> {
        try {
            await this.conexionDatabase.ejecutarConsultaSQL(`update categoria set descripcion='${this.descripcion}' where id=${this.id}`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificarCategoria", error);
            return false;
        }
    }

}