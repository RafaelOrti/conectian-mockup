# Descripción de Opciones del Menú de Usuario

Este documento explica qué hace cada opción del menú desplegable del perfil de usuario en CONECTIAN.

## Opciones del Menú (Cliente y Proveedor)

### 💡 Centro de Innovación (Cliente) / Centro de Crecimiento (Proveedor)

**Ruta Cliente:** `/client/innovation-center`  
**Ruta Proveedor:** `/provider/growth-center`

**¿Qué hace?**
- **Para Clientes:** Espacio dedicado a explorar tendencias de innovación, casos de uso destacados, y recursos educativos sobre IA y transformación digital.
- **Para Proveedores:** Centro de crecimiento empresarial con herramientas para mejorar visibilidad, análisis de mercado, y estrategias de crecimiento.

**Funcionalidades:**
- Acceso a recursos educativos
- Tendencias del mercado
- Herramientas de networking
- Sistema de referidos y créditos

---

### ⚙️ Gestionar Perfil

**Ruta Cliente:** `/client/profile`  
**Ruta Proveedor:** `/provider/profile`

**¿Qué hace?**
- Permite editar y actualizar la información del perfil de usuario.
- Configuración de preferencias de cuenta.
- Gestión de información de empresa (para proveedores).
- Actualización de datos personales y de contacto.

**Funcionalidades:**
- Editar información personal
- Cambiar foto de perfil
- Actualizar datos de empresa
- Configurar preferencias de notificaciones
- Gestionar configuración de privacidad

---

### 📋 Historial

**Ruta Cliente:** `/client/history`  
**Ruta Proveedor:** `/provider/history`

**¿Qué hace?**
- Muestra el historial completo de actividades del usuario en la plataforma.
- Registro de búsquedas realizadas (clientes).
- Historial de casos de uso publicados (proveedores).
- Registro de interacciones y transacciones.

**Funcionalidades:**
- Ver historial de búsquedas
- Historial de proyectos y deal rooms
- Registro de propuestas enviadas/recibidas
- Historial de pagos y transacciones

---

### ✉️ Invitaciones

**Ruta Cliente:** `/client/invitations`  
**Ruta Proveedor:** `/provider/invitations`

**¿Qué hace?**
- Gestiona las invitaciones recibidas y enviadas.
- Invitaciones a unirse a proyectos o deal rooms.
- Invitaciones de networking entre usuarios.
- Invitaciones para colaborar en casos de uso.

**Funcionalidades:**
- Ver invitaciones pendientes
- Aceptar o rechazar invitaciones
- Enviar nuevas invitaciones
- Historial de invitaciones

---

### 💬 Mensajes

**Ruta Cliente:** `/client/messages`  
**Ruta Proveedor:** `/provider/messages`

**¿Qué hace?**
- Centro de mensajería general de la plataforma.
- Mensajes directos entre usuarios.
- Diferente del chat dentro de Deal Rooms (que es específico por proyecto).
- Comunicación general y networking.

**Funcionalidades:**
- Ver conversaciones
- Enviar mensajes directos
- Notificaciones de mensajes nuevos
- Búsqueda de conversaciones

---

### 🌟 Referidos y Networking

**Ruta Cliente:** `/client/referrals`  
**Ruta Proveedor:** `/provider/referrals`

**¿Qué hace?**
- Sistema de referidos donde los usuarios pueden invitar a otros a unirse a la plataforma.
- Programa de recompensas por referidos.
- Networking y conexiones entre usuarios.
- Gestión de red de contactos.

**Funcionalidades:**
- Invitar nuevos usuarios
- Ver referidos realizados
- Gestionar red de contactos
- Ver recompensas obtenidas
- Historial de referidos

---

### 💳 Pagos

**Ruta Cliente:** `/client/payments`  
**Ruta Proveedor:** `/provider/payments`

**¿Qué hace?**
- Gestión de métodos de pago y facturación.
- Historial de pagos y transacciones.
- Configuración de métodos de pago.
- Facturas y recibos.

**Funcionalidades:**
- Ver historial de pagos
- Agregar/editar métodos de pago
- Descargar facturas
- Ver suscripciones activas
- Gestionar facturación

---

## Opciones del Footer del Menú

### 👤 Mi Perfil

**Ruta Cliente:** `/client/profile`  
**Ruta Proveedor:** `/provider/profile`

**¿Qué hace?**
- Acceso rápido al perfil público del usuario.
- Vista de cómo otros usuarios ven tu perfil.
- Información pública visible en la plataforma.

**Diferencia con "Gestionar Perfil":**
- **Mi Perfil:** Vista pública del perfil (solo lectura)
- **Gestionar Perfil:** Edición y configuración del perfil

---

### 🚪 Cerrar Sesión

**¿Qué hace?**
- Cierra la sesión actual del usuario.
- Redirige a la página de login.
- Limpia los datos de sesión almacenados.

**Funcionalidades:**
- Cerrar sesión de forma segura
- Opción de "Recordar sesión" (si está habilitada)
- Redirección automática al login

---

## Notas Importantes

1. **Rutas diferentes por rol:** Clientes y Proveedores tienen rutas específicas para cada funcionalidad, adaptadas a sus necesidades.

2. **Algunas funcionalidades pueden estar en desarrollo:** Algunas opciones pueden mostrar "En construcción" hasta que se implementen completamente.

3. **Navegación:** Todas las opciones del menú utilizan el sistema de rutas de Angular para navegar entre páginas.

4. **Permisos:** Algunas opciones pueden tener restricciones según el tipo de cuenta o plan de suscripción del usuario.



