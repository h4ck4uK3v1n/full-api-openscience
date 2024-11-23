### Documentación de los Endpoints CRUD de Usuarios

---

### **Descripción**
Se desarrollaron endpoints para manejar usuarios en el sistema. Los endpoints permiten crear, ver, actualizar y eliminar usuarios. También incluyen campos como roles y estados de bloqueo.

---

### **Formulario de Usuario**
- **username**:  
  - Tipo: Texto, mínimo 3 caracteres, obligatorio.  
- **email**:  
  - Tipo: Texto, debe ser un email válido, mínimo 6 caracteres, obligatorio.  
- **password**:  
  - Tipo: Texto, mínimo 6 caracteres, obligatorio.  
- **confirmed**:  
  - Tipo: Booleano, indica si el usuario confirmó su cuenta.  
  - Predeterminado: `false`.  
- **blocked**:  
  - Tipo: Booleano, indica si el usuario está bloqueado.  
  - Predeterminado: `false`.  
- **role**:  
  - Tipo: Array de roles.
  - predeterminado: `[]`.

---

### **Endpoints**

A continuación, se detallan los endpoints disponibles para la gestión de usuarios en el sistema, junto con ejemplos de cómo utilizarlos.

---

#### **1. Crear un Usuario**
**Endpoint**: `POST /users-management`  
**Ejemplo**:  

```bash
curl -X POST http://localhost:3000/users-management \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "securepassword",
  "confirmed": false,
  "blocked": false,
  "role": ["admin", "editor"]
}'
```

---

#### **2. Listar Usuarios**
**Endpoint**: `GET /users-management`  
**Ejemplo**:  

```bash
curl -X GET http://localhost:3000/users-management
```

---

#### **3. Ver Detalle de un Usuario**
**Endpoint**: `GET /users-management/:id`  
**Ejemplo** (reemplazar `<USER_ID>` con el ID real del usuario):  

```bash
curl -X GET http://localhost:3000/users-management/<USER_ID>
```

---

#### **4. Actualizar un Usuario**
**Endpoint**: `PUT /users-management/:id`  
**Ejemplo** (reemplazar `<USER_ID>` con el ID real del usuario):  

```bash
curl -X PUT http://localhost:3000/users-management/<USER_ID> \
-H "Content-Type: application/json" \
-d '{
  "username": "updateduser",
  "email": "updateduser@example.com",
  "password": "newsecurepassword",
  "confirmed": true,
  "blocked": false,
  "role": ["editor"]
}'
```

---

#### **5. Eliminar un Usuario**
**Endpoint**: `DELETE /users-management/:id`  
**Ejemplo** (reemplazar `<USER_ID>` con el ID real del usuario):  

```bash
curl -X DELETE http://localhost:3000/users-management/<USER_ID>
```

---

### **Notas**
- Reemplace `http://localhost:3000` con la URL base de su servidor si es diferente.
- Asegúrese de que el servidor esté en ejecución antes de realizar las solicitudes. 
- Algunos endpoints pueden requerir autenticación dependiendo de las reglas de su sistema.