/**
 * Importancion de librerias
 */
import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import methodOverride from 'method-override';
import { Conexion } from './config/Conexion';

/**
 * Importacion de Vistas (rutas)
 */
// import PLibro from './controladores/libroPresentacion/PresentacionLibro';

/**
 * Clase Principal "App"
 */
export class App {

    /**
     * Atributos
     */
    private app: Application;

    /**
     * Inicializa el servidor http (express), consiguraciones, midlewares y rutas
     * - Guarda en una variable global el puerto a iniciae el servidor HTTP
     * - ejecuta los metodos settings, middlewares y routes, que estan implementados en esta clase
     * @param port puerto para inicializar el servidor HTTP
     */
    constructor(port?: number | string) {
        this.app = express();
        this.app.set('PORT', process.env.PORT || port || 3000);
        this.setting();
        this.middlewares();
        this.routes();
    }

    /**
     * Inicializa las consiguraciones del servidor HTTP (settings)
     * configuraciones:
     * - direccion de las vistas (hbs y clases presentacion)
     * - direccion de las particiones de las vistas (hbs)
     * - habilitacion del envio de datos por la url
     * - habilitacion de methodOverride para las peticiones HTTP.PUT y HTTP.DELETE
     */
    private setting(): void {
        this.app.set("views", path.join(__dirname, "vistas"));
        // Initialize handlebars engine
        let hbs = expressHandlebars.create({
            extname: '.hbs',    // files extensions
            partialsDir: path.join(this.app.get('views'), 'partials'),  // partitions hbs
            defaultLayout: 'main',  // main file
            layoutsDir: path.join(this.app.get('views'), 'layout'),
            helpers: {
                foo: function (a: Number, b: Number, opts: any) {
                    return (a == b) ? opts.fn(this) : opts.inverse(this);;
                }
            }
        });
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');                             // using handlebars
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(methodOverride('_method'));                      // you can to send html methods as put, delete
        let conexion = Conexion.getInstancia();
    }

    /**
     * Se ejecuta los Middlewares antes de proceder con una peticion HTTP
     * - habilitacion de Morgan (descripcion de las peticiones HTTP en la consola)
     * - habilitacion de ingreso de informacion por JSON
     */
    private middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    /**
     * Funcion para la creacion de las instancias de la capa presentacion
     * Casos de Uso a instanciar:
     * - Libros
     */
    private routes(): void {
        // let presentationBook: PLibro = new PLibro();
        // this.app.use('/api_soul', presentationBook.router);
    }

    /**
     * Metodo para la ejecucion del servidor HTTP atraves del puerto anteriormente guardado
     */
    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('PORT'));
        console.log("\x1b[46m", "\x1b[30m", `Server on port ${this.app.get('PORT')}`, "\x1b[0m");
    }
}