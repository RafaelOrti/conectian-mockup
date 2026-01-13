# 🚀 Conectian Frontend - Angular Application

Aplicación frontend para la plataforma Conectian AI Marketplace.

## 📦 Stack Tecnológico

- **Framework**: Angular 17+ (Standalone Components)
- **Lenguaje**: TypeScript
- **Estilos**: SCSS con design system custom
- **Router**: Angular Router con lazy loading
- **HTTP**: Angular HttpClient
- **Estado**: Servicios con BehaviorSubject (NgRx opcional para v2)

## 🎨 Design System

### Paleta de Colores

```scss
Primary Blue: #0d86ff  // Confianza, CTAs
AI Purple: #6b5cf0      // Innovación, Features IA
Success Green: #18b981  // ROI, Completado
Warning Orange: #f96908 // Alertas
Danger Red: #f4444a     // Errores
Dark BG: #111a2c        // Background principal
```

### Componentes Compartidos

- ✅ `BadgeComponent` - Badges de estado y tags
- ✅ `CardComponent` - Cards con glassmorphism
- ✅ `ButtonComponent` - Botones con loading state
- ✅ `NavbarComponent` - Barra de navegación top
- 🔜 `SidebarComponent` - Navegación lateral
- 🔜 `ModalComponent` - Diálogos y modales
- 🔜 `FilterComponent` - Filtros avanzados

## 📁 Estructura de Carpetas

```
src/app/
├── core/                 # Servicios singleton, guards, interceptors
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── shared/              # Componentes, directivas, pipes compartidos
│   └── components/
├── features/            # Módulos de features (lazy loaded)
│   ├── auth/           # Login, Register, Onboarding
│   ├── client/         # Vistas de Cliente
│   ├── provider/       # Vistas de Proveedor
│   ├── deal-room/      # Deal Room
│   └── admin/          # Panel Admin
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start
ng serve

# Build producción
npm run build
ng build --configuration production

# Tests
npm test
ng test

# Lint
npm run lint
ng lint
```

## 🔧 Configuración

### Variables de Entorno

Crear `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  brandfetchApiKey: 'YOUR_KEY',
  apolloApiKey: 'YOUR_KEY',
  websocketUrl: 'http://localhost:3000'
};
```

## 📱 Vistas Implementadas

### ✅ Autenticación
- [x] Login (con tabs Cliente/Proveedor)
- [ ] Registro (multi-step onboarding)
- [ ] Recuperar contraseña

### 🔜 Cliente
- [ ] Dashboard + Marketplace
- [ ] Detalle de Caso de Uso
- [ ] Perfil del Proveedor
- [ ] Publicar Caso RFID
- [ ] Centro de Innovación (Gamificación, Team Map)
- [ ] Centro de Notificaciones

### 🔜 Proveedor
- [ ] Dashboard "AI Sales Agent"
- [ ] Marketplace de Empresas
- [ ] Publicar Caso de Uso
- [ ] Centro de Innovación
- [ ] Bandeja de Leads (CRM)
- [ ] Centro de Notificaciones

### 🔜 Deal Room
- [ ] Chat & Comunicación
- [ ] Equipos
- [ ] Documentos
- [ ] Hitos & Propuesta
- [ ] Legal & NDA
- [ ] Reseñas

### 🔜 Admin
- [ ] Dashboard (KPIs)
- [ ] Gestión de Usuarios
- [ ] Gestión de Contenido
- [ ] Gestión Financiera
- [ ] Configuración Plataforma
- [ ] Monitoreo Técnico

## 🎨 Mockups UI

Ver documentación completa de mockups en:
- [Walkthrough con Mockups](../../.gemini/antigravity/brain/99ab7600-fb50-4f02-b941-1343c4b5d9e8/walkthrough.md)
- [Plan de Implementación](../../.gemini/antigravity/brain/99ab7600-fb50-4f02-b941-1343c4b5d9e8/implementation_plan.md)

## 📄 Licencia

Propiedad de Conectian - Todos los derechos reservados
