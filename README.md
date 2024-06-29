# Ejecutar el proyecto

Teniendo en cuenta que tienes las configuraciones necesarias para ejecutar un proyecto en React Native, podemos iniciar con el proceso de ejecución.

En caso de no tener el ambiente configurado, te invito a visitar la documentación oficial de React Native donde podrás aprender a configurar tu ambiente de desarrollo desde cero.

# Enlace para documentación oficial 
https://reactnative.dev/docs/environment-setup


Para empezar, debes instalar las dependencias del proyecto con el comando:
npm install

A continuación si quieres correr el proyecto en ios, debes instalar todos los pods con el comando
pod install (Esto se debe ejecutar desde la carpeta ios/)

Para correr la aplicación en iOS el comando es el siguiente (desde la raíz del proyecto):
npm run ios

Para correr la aplicación en android, el comando es el siguiente (desde la raíz del priyecto):
npm run android

Si todo sale correctamente, deberías ver la app corriendo en tu emulador/dispositivo Android o iOS


# Pruebas unitarias
Para ejecutar las pruebas unitarias se debe ejecutar el siguiente comando
npm test