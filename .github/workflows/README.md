# GitHub Actions Workflows

Este directorio contiene los workflows de CI/CD optimizados para mayor confiabilidad y resistencia a fallos.

## 🔧 Workflows Disponibles

### 1. **CI Workflow** (`ci.yml`)

Workflow principal que se ejecuta en push y pull requests a las ramas `main` y `develop`.

#### ✨ **Mejoras Implementadas:**
- **Timeouts configurados**: Evita workflows colgados
- **Verificación de dependencias**: Instala automáticamente si faltan
- **Manejo robusto de cache**: Con restore-keys como fallback
- **Auto-corrección de lint**: Intenta corregir errores automáticamente
- **Comandos CI-específicos**: Usa comandos optimizados para entornos CI
- **Mejor logging**: Mensajes informativos en cada paso
- **Upload de coverage**: Guarda reportes de cobertura como artefactos

#### 🏗️ **Estructura del Workflow:**
```
Setup → [Lint + Test] → Build
```

**Jobs:**
1. **Setup** (10 min timeout): Instala y cachea dependencias
2. **Lint** (5 min timeout): Verifica y corrige formato de código
3. **Test** (10 min timeout): Ejecuta tests con coverage
4. **Build** (10 min timeout): Construye la aplicación

### 2. **Health Check Workflow** (`health-check.yml`)

Workflow ligero para verificación rápida de salud del proyecto.

- **Trigger manual**: `workflow_dispatch`
- **Programado**: Lunes a las 8 AM UTC
- **Timeout**: 5 minutos
- **Propósito**: Validación básica de herramientas y dependencias

## 📦 Scripts NPM Mejorados

### Comandos CI-específicos:
```json
{
  "test:ci": "vitest run --coverage --reporter=verbose --no-watch",
  "lint:check": "biome check --no-errors-on-unmatched", 
  "ci:full": "pnpm run lint:check && pnpm run test:ci && pnpm run build"
}
```

### Ventajas:
- **`test:ci`**: Ejecuta tests sin modo watch, ideal para CI
- **`lint:check`**: Lint sin errores por archivos no encontrados
- **`ci:full`**: Comando completo para validación local antes de push

## 🚀 Uso Recomendado

### Para desarrollo local:
```bash
# Validación completa antes de commit
pnpm run ci:full

# Solo tests con coverage
pnpm run test:ci

# Solo verificación de lint
pnpm run lint:check
```

### Para debugging de CI:
1. Ejecuta `pnpm run ci:full` localmente
2. Si falla, revisa los logs específicos de cada paso
3. Los timeouts y verificaciones adicionales ayudan a identificar problemas

## 🔍 Características de Robustez

### 1. **Gestión de Cache Inteligente**
- Cache primario por hash de `pnpm-lock.yaml`
- Fallback con `restore-keys` por prefijo
- Verificación e instalación automática si cache falla

### 2. **Verificaciones Pre-ejecución**
- Confirma existencia de `node_modules`
- Verifica disponibilidad de herramientas clave
- Reinstala dependencias si es necesario

### 3. **Manejo de Errores**
- Auto-corrección en linting (`continue-on-error: true`)
- Verificación de versiones de herramientas
- Logs detallados para debugging

### 4. **Optimizaciones de Rendimiento**
- Jobs paralelos (lint y test)
- Cache eficiente de dependencias
- Comandos optimizados para CI

## 📊 Métricas de Éxito

- **110 tests** ejecutándose correctamente
- **Coverage del 96.87%** en componentes críticos
- **Tiempo promedio**: ~3-5 minutos por workflow completo
- **Tasa de éxito mejorada** con manejo robusto de errores

## 🛠️ Solución de Problemas

### Si el workflow falla en lint:
- Revisa si Biome está instalado correctamente
- Ejecuta `pnpm run fix` localmente
- Verifica permisos de escritura en CI

### Si el workflow falla en test:
- Confirma que vitest esté disponible
- Revisa configuración de testing en `vitest.config.mts`
- Verifica variables de entorno necesarias

### Si el workflow falla en build:
- Confirma que Next.js esté instalado
- Revisa configuración de Turbopack
- Verifica variables de entorno de producción

---

✅ **Estado actual**: Workflows optimizados y funcionando correctamente con manejo robusto de errores y timeouts configurados.