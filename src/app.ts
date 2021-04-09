/**
 * Import libraries
 */
import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import methodOverride from 'method-override';
import PLibro from './presentacion/libroPresentacion/Plibro';

/**
 * Import Routes
 */


/**
 * Class Principal Main "App"
 */
export class App {

    private app: Application;

    /**
     * initialize framework express, its midlewares and routes
     * @param port port for initialize server
     */
    constructor(port?: number | string) {
        this.app = express();
        this.app.set('PORT', process.env.PORT || port || 3000);
        this.setting();
        this.middlewares();
        this.routes();
    }

    /**
     * Initialize project config (settings)
     */
    private setting(): void {
        this.app.set("views", path.join(__dirname, "presentacion"));
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
    }

    /**
     * Middlewares process run foreach request http
     */
    private middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    /**
     * write routes of the software for get request http
     */
    private routes(): void {
        //    this.app.use('/api_soul', authRouter);
        let presentationBook: PLibro = new PLibro();
        this.app.use('/api_soul', presentationBook.router);
    }

    /**
     * initialize server rest-api on port this.get('PORT')
     */
    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('PORT'));
        console.log(`Server on port ${this.app.get('PORT')}`);
    }
}