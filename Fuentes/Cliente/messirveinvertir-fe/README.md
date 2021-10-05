# Configuración del proyecto messirveinvertir-fe

## Instalación de npm

`npm install`

### Compilación del proyecto

`npm run serve`

### Compilación y minimizacion para producción

`npm run build`

### Detectar errores de linteo

`npm run lint`

### Correr los tests unitarios

`npm run test:unit`

## Par correr proyecto con Android Studio

Primero debera buildear los cambios realizados con el siguiente comando:

`ionic build`

Luego debera generar la carpeta `android` con el siguiente comando de capacitor:

`npx cap add android`

Luego debera abrir el proyecto en android studio con el siguiente comando:

`npx cap open android`

Luego debera correr el proyecto en android studio con el siguiente comando:

`npx cap run android`
