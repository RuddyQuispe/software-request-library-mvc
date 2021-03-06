# Software Request Library MVC Patron (Model, View, Controller)

_First partial exam of the subject of Software Architecture UAGRM-FICCT._
_Software Web para la gesti贸n de prestamos de libros para la biblioteca municipal_

## Comenzando 馃殌

_A continuaci贸n, estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 馃搵

_Que cosas necesitas para instalar el software y como instalarlas_

```
Node JS version LTS
npm (gestor de paquetes en nodejs; viene incluido en Nodejs)
PostgreSQL
Navegador Web
```

### Instalaci贸n 馃敡

_Cargar la BD en un motor SQL PostgreSQL_

_\* el codigo SQL se encuentra en ./src/database/sql/script.sql_

_Paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_
_1ro. debe crear el role en el motor de BD PostgreSQL_
_2do. debe crear la BD e ejecutar el script de las tablas SQL en el motor de BD PostgreSQL_
_3ro. El archivo .env.example debe cambiar el nombre a .env_
_4to. El archivo .env debe asignar los valores de las variables (DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD) para la conexion a la BD_
_5to. Ejecutar los siguientes comandos en la consola del Sistema Operativo_

```
cd /software-request-library-mvc
npm install
npm run dev
```

_... Y para detener la compilaci贸n_

```
Ctrl+c
```

_Nota: A veces suele colgarse la terminal del SO; pero solo con Ctrl+c se actualizara la consola (Es comun este caso especial)._

## Ejecutando las pruebas 鈿欙笍

_Ya esta explicado alli arriba ( punto. Instalaci贸n )_

### Analice las pruebas end-to-end 馃敥

_Buscar en google (http://aun_no_hay_link.lan)_

### Y las pruebas de estilo de codificaci贸n 鈱笍

_Software para el registro de prestamos de libros para la biblioteca municipal_
_Este software web esta estructurado por la arquitectura MVC, utiliza el protocolo HTTP/HTTPS para la interaccion del usuario_

## Despliegue 馃摝

_pm2 (recomendado); PERO NO ESTA IMPLEMENTADO HASTA ESTA FASE DE DESARROLLO_

## Construido con 馃洜锔?

_herramientas que utiliza para crear tu proyecto_

- [NodeJS](https://nodejs.org/en/) - Compilador de JS en el ordenador
- [PostgreSQL](https://www.postgresql.org/) - Motor de Base de Datos

## Contribuyendo 馃枃锔?

Por favor lee el [GitHub](https://google.com) para detalles de nuestro c贸digo de conducta, y el proceso para enviarnos pull requests.

## Versionado 馃搶

Usamos [Git](http://git.org/) para el versionado.

## Autores 鉁掞笍

_Agradecido con el de Arriba_

- **Quispe Mamani Ruddy Bryan** - _Scrum Master Jr, Product Owner Jr, Development Team Jr_ - [Github](https://github.com/RuddyQuispe) [Bitbucket](https://bitbucket.org/dashboard/repositories)

## Expresiones de Gratitud 馃巵

- Agradecido con el de Arriba 馃摙
- Este proyecto tiene fines de aportar con la comunidad de software libre, con mi humilde conocimiento que adquiri con la practica.

---

鈱笍 con 鉂わ笍 por Ruddy Quispe(ruddyq18@gmail.com) 馃槉
