# MessirveInvertir BE
Componente backend del sistema MessirveInvertir.

## Tecnología
Para el desarrollo de este componente se utiliza el framework
[Adonis.js](https://docs.adonisjs.com/guides/introduction)

## Instalación 
Crear el archivo de configuración de entorno .env.
````shell
cp .env.example .env
````
Instalar dependencias de Node.
````shell
npm install
````

## Base de datos
La aplicación utiliza el paquete [Lucid](https://docs.adonisjs.com/guides/database/introduction)
para conectarse con la base de datos. El estándar es utilizar **PostgreSQL**
como motor de base de datos, aunque es posible configurar cualquier
motor compatible con Lucid.

### Configuración de base de datos
Se utilizan las siguientes variables de entorno:
````dotenv
DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=root
PG_DB_NAME=messirve_dev
````
### Migración de la base de datos
Es posible ejecutar las migraciones mediante el comando:
````shell
node ace migration:run
````

## Ejecución local
Se puede levantar el ambiente con hot reload.
````shell
node ace serve --watch
````

## Compilación para producción
Siempre se debe compilar el código JavaScript en el server de producción
ejecutando el siguiente comando.
````shell
node ace build --production
````
El código compilado es escrito en la carpeta ``build``.
Para ejecutarlo se accede a la carpeta y se ejecuta el archivo ``server.js``
de la siguiente forma.
````shell
cd build
node server.js
````

## Tests
Los tests utilizan el paquete
[Japa](https://github.com/thetutlage/japa#test-your-apps)
según lo descrito por la
[documentación de Adonis](https://docs.adonisjs.com/cookbooks/testing-adonisjs-apps).

Para ejecutar todos los tests se utiliza el siguiente comando:
````shell
npm run test
````
Los mismos se dividen en dos carpetas según su tipo:
* ``/test/unit``: pruebas unitarias sobre componentes específicos del sistema.
* ``/test/feature``: pruebas de integración en las que se interacciona mediante
una interfaz expuesta de la aplicación y se utiliza una base de datos de prueba.

### Convenciones de nombre
Para nombrar un grupo de tests se debe utilizar el formato
``class|global feature``.

Por ejemplo:
```Javascript
test.group('Calculator', () => {
  // ...
})
```

Para el nombramiento de los tests se utiliza el formato
``[method|feature] (context) : expected result``.

Por ejemplo:
```javascript
test('[division] (divisor is zero) : should throw exception', (assert) => {
  try {
    Calculator.Divide(100, 0)
  } catch ({ message }) {
    assert.equal(message, 'Division by 0 is forbidden')
  }
})
```

## Documentación de la API
La API REST expuesta por la aplicación se encuentra documentada en Swagger utilizando
el paquete [adonis5-swagger](https://www.npmjs.com/package/adonis5-swagger).
Dicha documentación está disponible en la ruta ``/docs`` de la aplicación.

## Autores
* [Federico Facundo](https://gitlab.com/facufede1998)
* [Martín Lejman](https://gitlab.com/marezelej)
