# API de Configuración SEO

Esta API permite la gestión de la configuración SEO de las páginas del sitio. Incluye los endpoints para crear, obtener, actualizar y eliminar configuraciones SEO.

## Base URL

http://localhost:3000/api

## Estructura de Datos de SEO

| Campo             | Tipo      | Requerido | Descripción                                                                                  |
|-------------------|-----------|-----------|----------------------------------------------------------------------------------------------|
| `meta_title`      | String    | Sí        | Título meta de la página                                                                     |
| `og_title`        | String    | Sí        | Título Open Graph                                                                           |
| `og_url`          | URL       | Sí        | URL Open Graph                                                                              |
| `og_image`        | URL       | No        | URL de la imagen Open Graph                                                                 |
| `og_image_height` | Número    | No*       | Altura de la imagen Open Graph (requerido si `og_image` está presente)                       |
| `og_image_width`  | Número    | No*       | Ancho de la imagen Open Graph (requerido si `og_image` está presente)                        |
| `meta_description`| String    | Sí        | Descripción meta de la página                                                                |
| `og_type`         | String    | Sí        | Tipo Open Graph (por ejemplo, `website`, `article`, etc.)                                    |

**Nota:** Los campos `og_image_height` y `og_image_width` son opcionales, pero si se proporciona `og_image`, deben estar presentes.



## Endpoints

### 1. Obtener todas las configuraciones SEO

**Endpoint:** `/seo`  
**Método:** `GET`  
**Descripción:** Obtiene la lista de todas las configuraciones SEO.

#### Ejemplo de Solicitud

GET http://localhost:3000/api/seo

#### Ejemplo de Respuesta

```json
{
    "seoList": [
        {
            "id": "6724595c75de2aaa4b07e1d7",
            "meta_title": "Open Science Project",
            "og_title": "Explore Open Science",
            "og_url": "https://example.com/open-science",
            "meta_description": "An open platform for scientific research and collaboration.",
            "og_type": "website",
            "og_image": "https://example.com/images/og-image.png",
            "og_image_height": 600,
            "og_image_width": 800
        },
        ...
    ]
}
```
### 2. Obtener una configuración SEO por ID

**Endpoint:** `/seo/:id`  
**Método:** `GET`  
**Descripción:** Obtiene una configuración SEO por su ID.

#### Ejemplo de Solicitud

GET http://localhost:3000/api/seo/6724595c75de2aaa4b07e1d7

#### Ejemplo de Respuesta
```json
{
    "_id": "6724595c75de2aaa4b07e1d7",
    "meta_title": "Open Science Project",
    "og_title": "Explore Open Science",
    "og_url": "https://example.com/open-science",
    "meta_description": "An open platform for scientific research and collaboration.",
    "og_type": "website",
    "og_image": "https://example.com/images/og-image.png",
    "og_image_height": 600,
    "og_image_width": 800
}
```


### 3. Crear una configuración SEO

**Endpoint:** `/seo`  
**Método:** `POST`  
**Descripción:** Crea una nueva configuración SEO.

#### Ejemplo de Solicitud

POST http://localhost:3000/api/seo
```json
{
    "meta_title": "Open Science Project",
    "og_title": "Explore Open Science",
    "og_url": "https://example.com/open-science",
    "meta_description": "An open platform for scientific research and collaboration.",
    "og_type": "website",
    "og_image": "https://example.com/images/og-image.png",
    "og_image_height": 600,
    "og_image_width": 800
}

```
#### Ejemplo de Respuesta

```json
"seo": "6724595c75de2aaa4b07e1d7"
```

### 4. Actualizar una configuración SEO por ID

**Endpoint:** `/seo/:id`  
**Método:** `PUT`  
**Descripción:** Actualiza una configuración SEO específica por su ID.

#### Ejemplo de Solicitud

PUT http://localhost:3000/api/seo/6724595c75de2aaa4b07e1d7
```json
{
    "meta_title": "Updated Open Science Project",
    "og_title": "Updated Open Science",
    "og_url": "https://example.com/open-science-updated",
    "meta_description": "An updated description for the Open Science project.",
    "og_type": "website",
    "og_image": "https://example.com/images/updated-og-image.png",
    "og_image_height": 600,
    "og_image_width": 800
}

```
#### Ejemplo de Respuesta

```json
{
    "seo": {
        "acknowledged": true,
        "modifiedCount": 0,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

### 5. Eliminar una configuración SEO por ID

**Endpoint:** `/seo/:id`  
**Método:** `DELETE`  
**Descripción:** Elimina una configuración SEO específica por su ID.

#### Ejemplo de Solicitud

DELETE http://localhost:3000/api/seo/6724595c75de2aaa4b07e1d7
#### Ejemplo de Respuesta

```json
{
    "seo": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```




