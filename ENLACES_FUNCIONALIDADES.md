# 🔗 Guía de Enlaces - Funcionalidades Implementadas

## 📍 Cómo Acceder a las Funcionalidades

### Para CLIENTE (`/client/...`)

#### 🏢 Marketplace (Principal)
- **URL:** `/client/marketplace`
- **Acceso:** Click en "Marketplace" en el navbar o desde el logo
- **Descripción:** Vista principal donde el cliente explora casos de uso

#### 💡 Centro de Innovación
- **URL:** `/client/innovation-center`
- **Acceso:** Click en el avatar → "Centro de Innovación"
- **Incluye:**
  - Estructura Organizativa (equipo)
  - Gamificación y Badges
  - Referidos y Networking
  - Análisis de Departamentos

#### 📈 Centro de Crecimiento
- **URL:** `/client/growth-center`
- **Acceso:** Click en el avatar → "Centro de Crecimiento"
- **Incluye:**
  - Billetera de Créditos
  - Referidos y Networking
  - Impacto de Proyectos (ROI, ahorros)

#### 🔍 Análisis de Mercado
- **URL:** `/client/market-analysis`
- **Acceso:** Click en el avatar → "Análisis de Mercado"
- **Incluye:**
  - Proveedores Recomendados
  - Oportunidades RFP
  - Insights por Sector

#### 📊 Analítica
- **URL:** `/client/analytics`
- **Acceso:** Click en el avatar → "Analítica"
- **Descripción:** Métricas y KPIs del cliente

#### 🌟 Referidos y Networking
- **URL:** `/client/referrals`
- **Acceso:** Click en el avatar → "Referidos y Networking"

#### 💳 Pagos
- **URL:** `/client/payments`
- **Acceso:** Click en el avatar → "Pagos"

#### 💬 Mensajes
- **URL:** `/client/messages`
- **Acceso:** Click en el icono 💬 en el navbar (topbar)

#### 🔔 Notificaciones
- **URL:** `/client/notifications`
- **Acceso:** Click en el icono 🔔 en el navbar (topbar) → Ver todas

#### 📁 Proyectos
- **URL:** `/client/project-management`
- **Acceso:** Click en el icono 📁 en el navbar o "Proyectos" en el navbar

---

### Para PROVEEDOR (`/provider/...`)

#### 🏠 Dashboard
- **URL:** `/provider/dashboard`
- **Acceso:** Click en "Dashboard" en el navbar o desde el logo

#### 🏢 Marketplace
- **URL:** `/provider/marketplace`
- **Acceso:** Click en "Marketplace" en el navbar

#### 💡 Centro de Innovación
- **URL:** `/provider/innovation-center`
- **Acceso:** Click en el avatar → "Centro de Innovación"
- **Incluye:**
  - Estructura Organizativa
  - Gamificación y Badges
  - Referidos y Networking
  - Top Casos de Uso

#### 📈 Centro de Crecimiento
- **URL:** `/provider/growth-center`
- **Acceso:** Click en el avatar → "Centro de Crecimiento"
- **Incluye:**
  - Gestión de Equipo y Sellos de Confianza
  - Billetera de Créditos y Referidos
  - Portfolio y Casos de Éxito
  - Historial de Referidos

#### 🔍 Análisis de Mercado
- **URL:** `/provider/market-analysis`
- **Acceso:** Click en el avatar → "Análisis de Mercado"
- **Incluye:**
  - Market Radar (Análisis de Demanda)
  - Pitch Optimizer (Auditoría de Conversión)
  - Gap Analysis (Análisis de Competencia)

#### 📊 Analítica
- **URL:** `/provider/analytics`
- **Acceso:** Click en el avatar → "Analítica"
- **Descripción:** Métricas y KPIs del proveedor

#### 🌟 Referidos y Networking
- **URL:** `/provider/referrals`
- **Acceso:** Click en el avatar → "Referidos y Networking"

#### 💳 Pagos
- **URL:** `/provider/payments`
- **Acceso:** Click en el avatar → "Pagos"

#### 💬 Mensajes
- **URL:** `/provider/messages`
- **Acceso:** Click en el icono 💬 en el navbar (topbar)

#### 🔔 Notificaciones
- **URL:** `/provider/notifications`
- **Acceso:** Click en el icono 🔔 en el navbar (topbar) → Ver todas

#### 📋 Leads CRM
- **URL:** `/provider/leads`
- **Acceso:** Click en "Leads" en el navbar

---

### 🚪 Deal Room (Compartido)

#### Deal Room
- **URL:** `/deal-room/:id`
- **Acceso:** Desde cualquier proyecto activo
- **Incluye:**
  - 💬 Chat & Comunicación
  - 👥 Equipos
  - 📄 Documentos
  - 🎯 Hitos & Propuesta (con aprobaciones pendientes)
  - ⚖️ Legal & NDA
  - ⭐ Reseñas
  - 🆘 Soporte
  - 📈 Calculadora ROI (modal)
  - ❓ Preguntas Unificadas (modal)
  - 📊 Generar Informe PDF

---

## 🎯 Menú del Usuario (Dropdown)

### Cliente y Proveedor tienen:
1. **Centro de Innovación** 💡
2. **Centro de Crecimiento** 📈
3. **Análisis de Mercado** 🔍
4. **Analítica** 📊
5. **Referidos y Networking** 🌟
6. **Pagos** 💳
7. **Cerrar Sesión** 🚪

---

## 🔝 Topbar (Iconos en el Navbar)

### Orden de izquierda a derecha:
1. **💬 Mensajes** - Con badge de mensajes no leídos
2. **🔔 Notificaciones** - Con dropdown de notificaciones
3. **📁 Proyectos** - Para CLIENT/PROVIDER
4. **👤 Usuario** - Con dropdown del menú

---

## 📝 Notas Importantes

- Todas las rutas están configuradas y funcionando
- El componente de Analytics es compartido entre cliente y proveedor
- El Deal Room tiene todas las mejoras implementadas (soporte, ROI, preguntas unificadas, aprobaciones)
- Los badges están disponibles en `/client/badges` y `/provider/badges` (aunque no están en el menú, están en las rutas)



