# Testing Setup - RapidJobs

Este proyecto utiliza **Vitest** como framework de testing con React Testing Library para los tests unitarios.

## 🧪 Configuración

### Framework de Testing
- **Vitest**: Framework de testing rápido y moderno
- **React Testing Library**: Para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para DOM
- **jsdom**: Entorno DOM simulado
- **@vitest/coverage-v8**: Reporte de cobertura de código

### Cobertura de Código
El proyecto usa **thresholds realistas** enfocados en testing de valor:
- Lines: 30% (testing esencial, no inflado)
- Functions: 60% (funcionalidades críticas)
- Branches: 65% (lógica de negocio)
- Statements: 30% (cobertura significativa)

## 📁 Estructura de Tests

```
__tests__/
├── dashboard/          # Métricas de negocio
│   └── dashboard-cards.test.tsx
├── forms/              # Funcionalidades core
│   └── role-option-card.test.tsx
└── shared/             # Navegación crítica
    └── navbar.test.tsx
```

**Solo 3 archivos de test** que cubren funcionalidades esenciales del negocio.

## 🚀 Comandos

### Ejecutar tests
```bash
# Ejecutar tests en modo watch
pnpm test

# Ejecutar tests una sola vez
pnpm test:run

# Ejecutar tests con reporte de cobertura
pnpm test:coverage

# Ejecutar tests en modo watch
pnpm test:watch

# Abrir interfaz de usuario de Vitest (requiere instalación adicional)
pnpm test:ui
```

## 📈 Coverage Actual

- **Lines**: 33.18% ✅ (threshold: 30%)
- **Functions**: 66.66% ✅ (threshold: 60%)  
- **Branches**: 70.37% ✅ (threshold: 65%)
- **Statements**: 33.18% ✅ (threshold: 30%)

**Enfoque LEAN**: Solo testing de funcionalidades que aportan valor al negocio.

## 🧩 Componentes Testeados

### ✅ Componentes UI
- **Button**: Variants, sizes, estados disabled, asChild
- **Badge**: Variants (default, secondary, destructive, outline)
- **Avatar**: Imagen, fallback, estilos personalizados
- **Card**: Todos los subcomponentes (Header, Title, Description, Content, Footer, Action)

### ✅ Componentes de Formularios
- **RoleOptionCard**: Estados selected/unselected, interacciones, iconos

### ✅ Componentes de Dashboard
- **DashboardCards**: Renderizado de métricas, indicadores de tendencia
- **DashboardChart**: Renderizado de gráficos (mocked), títulos, descripciones

### ✅ Componentes de Navegación
- **Navbar**: Enlaces, botones de navegación, logo, routing
- **SiteHeader**: Componentes internos, enlaces externos

### ✅ Utilidades
- **cn**: Función de combinación de clases de Tailwind CSS

## 🔧 Configuración de Vitest

La configuración incluye:
- **Environment**: jsdom para simular el DOM
- **Globals**: true para usar describe, it, expect globalmente
- **Coverage Provider**: v8 (nativo de Node.js)
- **Setup Files**: `vitest.setup.ts` para configuraciones globales
- **Path Resolution**: Soporte para aliases de TypeScript

### Archivos Excluidos del Coverage
- Archivos de configuración
- Rutas de Next.js (`app/**`)
- Hooks y acciones (para enfocarnos en componentes UI)
- Componentes UI no esenciales
- Tipos y schemas
- Utilidades de Supabase

## 🎯 Mejores Prácticas

1. **No usar espacios innecesarios** en el código de test
2. **No usar comentarios explicativos** redundantes
3. **No aplicar sobreingeniería** - testear solo funcionalidades esenciales
4. **Enfocarse en comportamiento de usuario** más que en implementación
5. **Usar mocks apropiados** para dependencias externas
6. **Testear casos edge** importantes pero no todos los posibles

## 🚧 Próximos Pasos

Para la siguiente fase (tests de integración), se pueden considerar:
- Tests de flujos de usuario completos
- Tests de integración entre componentes
- Tests de formularios con validaciones
- Tests de rutas y navegación
- Tests de estado global (si se implementa)

## 🐛 Resolución de Problemas

### Error: "Cannot read properties of undefined"
- Verificar que los mocks estén configurados correctamente
- Revisar imports y paths

### Tests fallan por componentes externos
- Agregar mocks para librerías externas en `vitest.setup.ts`
- Usar `vi.mock()` para dependencias complejas

### Coverage bajo
- Revisar archivos excluidos en `vitest.config.mts`
- Añadir tests para componentes críticos sin testear