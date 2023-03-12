# News Cover API

## Getting Started

Configure NodeJS with version 18 lts.

``` bash
nvm install --lts
nvm use --lts
```

### Clone repository

To clone this repository just copy and run this command in your terminal.

``` bash
git clone https://github.com/wilop/news-cover-api.git
```

### Install dependencies

Add a list of dependencies used in project here.
* express
* cors
* body-parser
* mongoose
* nodemon
* jsonwebtoken
* dotenv
* moment
* rss-parser

#### Install NodeJS packages

To install dependencies just copy and run this command in your terminal.

```bash
npm install
```

To install additional dependencies just run `npm install` __package__ in your terminal and add it to previous list.

#### Create enviroment variables
After installing dotenv, create a file name .env and add the following variables with respective information, this is an example and the '* *' should be ignore:
```
DB_CONNECTION = mongodb://127.0.0.1:27017/mynewscover *mongo db string conection*
PORT = 4000  *port to be listeng in the app*
URL = http://locahost
```

## WorkTree 

Add directories and a short description here.

> **models:**  
This directory contains data models.
        
> **controllers:**  
This directory contains controllers.

## TODO
### Funcionalidades
- [ ] Web API
    1. [ ] Gestión de Fuentes de Noticias
        - [ ] CRUD
        - [ ] Cargar: Se debe desarrollar un proceso que ejecutado por medio de un request al API procesa las fuentes de noticias de un usuario específico, cada noticia identificada por el proceso se agrega a la base de datos y se asocia al usuario específico.
    2. [ ] Gestión de Noticias
        - [ ] CRUD
        - [ ] Filtrar por categoria
    - [ ] Gestión de usuarios
        - [ ] CRUD
        - [ ] Autenticar 
    - [ ] Gestion de Categorias
- [ ] Aplicación Cliente
    - [ ] Es necesario un usuario y una contraseña para poder ingresar al sistema.
    - [ ] Los usuarios podrán registrarse en el sistema utilizando un formulario e incluyendo sus datos personales.
    - [ ] Si el usuario al ingresar no tiene ninguna fuente de noticias asociada se le llevará a la pantalla de inclusión de fuentes de noticias para que incluya al menos una (RSS feed). El usuario podrá crear las fuentes de noticias que guste.
    - [ ] Una vez incluida la fuente de noticias se deberá ejecutar el proceso para cargar las noticias contenidas en el feed (en esta etapa este proceso será ejecutado con una llamada al API, ver tabla de endpoints).
    - [ ] **MyCover** es la pantalla principal de los usuarios autenticados, en esta se mostrarán con estilo de noticias un listado de todas las noticias consumidas por news grabber. 
        - [ ] Las noticias se mostrarán en orden cronológico (más recientes primero).
        - [ ] En el Timeline se mostrará solo el título, la fecha, la fuente, imagen (si tiene), los primeros 200 caracteres del contenido y las categorías.
        - [ ] Al hacer click en el título o a la imagen deberá llevar al usuario al link original de la noticia o también en el texto de Ver Noticia.
    - [ ] Filtrar MyCover por categoría. La aplicación mostrará todas las categorías existentes de los feeds de manera que cuando el usuario hace click en la categoría MyCover se filtrará y mostrará únicamente las noticias asociadas a esa categoría.
    - [ ] **News Sources** podrán ser administradas por el usuario en la sección correspondiente. El usuario podrá agregar, editar y eliminar fuentes de noticias. Las fuentes de noticias estarán compuestas por:
    - [ ] RSS url
    - [ ] Nombre de la fuente
    - [ ] Categoría (listado de categorías creadas por el Administrador)
    - [ ] Por ejemplo: 
        - [ ] RSS: https://feeds.feedburner.com/crhoy/wSjk
        - [ ] Nombre: CRhoy
        - [ ] Categoria: Nacionales
- [ ] Area Administrativa
    - [ ] Solo usuarios con rol de administrador pueden ingresar a esta sección.
    - [ ] El usuario administrador podrá realizar un CRUD de categorías.

### Endpoints
- [X] **/user** Get and Register an user 
    - [X] GET
    - [X] POST
- [ ] **/session** Authenticate an user 
    - [ ] POST
- [ ] **/newsource** Manage news sources 
    - [ ] GET
    - [ ] POST
    - [ ] PUT
    - [ ] DELETE
- [ ] **/newsource/{id}/process** Read the RSS and insert the news associated to the owner of the newsource
    - [ ] POST
- [ ] **/categories** Manage categories 
    - [ ] GET
    - [ ] POST
    - [ ] PUT
    - [ ] DELETE
- [ ] **/news/{user_Id}** Get the news of the user
    - [ ] GET
- [ ] **/news/{user_Id}?category=categoryId** Filter news by category
    - [ ] GET
