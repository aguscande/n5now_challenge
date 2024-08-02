# n5now_challenge

## Descripción

Este proyecto es un desafío técnico para n5now y consiste en crear un sistema de registro de infracciones de tránsito en Python.

## Instalación y Uso

Para iniciar cada parte del proyecto, hay un script llamado `script.sh` en los directorios de frontend y backend, que debe ser ejecutado. Este script se encarga de la instalación y configuración necesarias. Una vez ejecutado, el proyecto estará listo para ser utilizado.

URL del backend:  [http://localhost:8000](http://localhost:8000)
URL del frontend: [http://localhost:4173](http://localhost:4173)

La base de datos se crea cada vez que se levanta un contenedor de Docker, por lo que no es necesario crearla manualmente. Tener en cuenta que los datos se perderán cada vez que se detenga el contenedor.

### Uso de API para endpoints de infracciones

1. **GET /generar_informe?email=<email>**: Obtiene todas las infracciones.
2. **POST /cargar_infraccion**: Crea una nueva infracción.
    Tiene como body:
    ```json
    {
        "placa_patente": "string",
        "timestamp": number,
        "comentarios": "string"
    }
    ```
    Requiere de un token de autenticación en el header.
    Para ello, se debe llamar al endpoint `/token`
    con el body:
    ```json
    {
        "name": "nombre_del_oficial",
        "number": "numero_del_oficial"
    }
    ```
    Este endpoint devovlera un access_token valido por 30 minutos para
    utilizar en el endpoint de cargar_infraccion.

### Pasos para ejecutar el script

1. Abre una terminal.
2. Navega al directorio del proyecto.
3. Ejecuta el siguiente comando:

   ```bash
   ./script.sh
   ```

## Arquitectura de AWS Propuesta

### Propuesta #1
1. **AWS EC2**
    - **Docker**: Correr contenedores de backend y frontend en Docker.
2. **AWS Route 56**
    - **Domain Name**: Registrar dominio.
    - **DNS Management**: MGestionar los registros DNS de su dominio.

### Propuesta #2

1. **Frontend**:
   - **Amazon S3**: Hosteo de archivos estaticos.
   - **Amazon CloudFront**: Distribucion los contenidos globalmente con baja latencia.

2. **Backend**:
   - **Amazon ECS (Elastic Container Service)**: Correr contenedores de backend.

3. **Monitoring and Logging**:
   - **Amazon CloudWatch**: Monitoreo de los servicios de AWS.
   - **AWS CloudTrail**: Track user activity and API usage.
