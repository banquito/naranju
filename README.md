Naranju
======================

## Características

- HTML5 y CSS3
- Responsive o Adaptive según la necesidad.
- Configurable.
- Construido en Stylus para desarrollar en Stylus.
- Ordenado y extensible.
- Sin código basura.
- Fácil de aprender.
- Incluye librerías js para formularios, modales, slider, tooltips tabs y más.


## Recursos javascript

- [jQuery](http://jquery.com/)
- [jQuery tools](http://jquerytools.org) (incluye: Tabs, Tooltip, Form Tools, Toolbox.)
- [flexSlider2](http://flexslider.woothemes.com/)
- [html5shim](http://code.google.com/p/html5shim/)
- [stylus](http://learnboost.github.io/stylus/)
- [jeet](http://jeet.gs/)
- [nib](http://visionmedia.github.io/nib/)
- [jade](http://jade-lang.com)

## Recursos Stylus

- Variables de entorno
    - Colores 
    - Fuentes
    - Ruta del directorio de contenidos multimedia (imágenes, tipografia, etc.)
- [Normalize](http://git.io/normalize).
- Tipografias incluidas y mediante google fonts
- Definición de formularios horizontales o verticales.
- Conjuntos de atributos para generar código recurrente. Algo asi como ejecutar funciones dentro del css.
- Elementos predefinidos.
    - Galería.
    - Navegación.
    - Rotador de imágenes.

## Instalación

**Atención: Para poder usar el servidor, debes tener instalado [nodejs](http://nodejs.org).**


##### En consola:

    git clone https://github.com/banquito/naranju.git
    cd naranju
    npm install
    grunt build
    grunt server watch

##### Navegar: 

    http://localhost:3000

Correr la aplicacion en heroku.com:

    heroku apps:create [example]
    git push heroku master
    heroku open

Miralo funcionando en [heroku](http://naranju.herokuapp.com)

Si necesitas ayuda con esto, [acá está la documentación de heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Instrucciones para trabajar con stylus en naranju

Lo primero que tenes que saber es que esta herramienta tiene que ser útil para tu proyecto, tomar una estructura como **naranju** para empezar no debe condicionarte, adaptala a tu necesidad.

Para empezar a utilizar **naranju** es necesario conocer la estructura de directorios. Si bien la podes cambiar a tu gusto para tu proyecto es necesario entenderla para modificarla.

Tené en cuenta que **naranju** usa una gran cantidad de recortes de código para facilitar la organización de tu proyecto. 

El objetivo de esto es facilitar la tarea de desarrollo y generar un único css compilado para tu sitio en producción.

#### Estructura de directorios:
<div class="folder">
  - **models** (archivos de datos en formato json)
  - **views** (archivos jade)
      - **_layouts** 
        - **includes**
        - **elements**
  - **assets**
      - **js**
      - **stylus** (aca se encuentran los archivos .styl, no es necesaria para producción)
        - **01core** (tipografias, reset, mixins y demás configuraciones generales)
        - **02elements**
        - **03components**
        - **04vendors**
        - **05helpers**
        - **06layouts**
        - **07navigations**
        - **08pages**
        - **09media**
  - **dist**
      - **assets**
        - **js** (tus scripts)
          - **lib** (recursos javascript de terceros)
        - **css**
        - **fonts** (tipografias a utilizar)
        - **img** (archivos de imagen que forman parte del diseño)
        - **upload** (archivos que forman parte del contenido)
</div>
#### Por donde empezar:

Lo primero que podés hacer es abrir el archivo *'app/assets/stylus/style.styl'*. Acá vás a encotrar todos los archivos incluidos en tu proyecto y el orden en que se cargan.

Fijate que los directorios esán numerados para facilitar la lectura, de todos modos, cada proyecto tiene sus requerimentos y este orden se puede alterar 
según las necesidades.

Si todavía no conoces **stylus**, este es el momento de darte una vuelta por [stylus](http://styluscss.org/).

#### Recomendaciones

Utilizá stylus desde un servidor local, instalarlo en cualquier sistema operativo suele ser una tarea simple.

## Jade

Mientras preparamos la documentación, podés ir a la [documentación](http://jade-lang.com/reference/) de [jade](http://jade-lang.com/).
