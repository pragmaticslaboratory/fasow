# FASOW

FASOW es un proyecto que contiene dos subproyectos: `fasow-api` y `fasow-monorepo`. Este repositorio incluye tanto la nueva versión de la biblioteca FASOW, expuesta como una API HTTP, como la biblioteca heredada y su cliente asociado para la interacción con experimentos.

## Contenido

- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

El proyecto FASOW se divide en dos partes principales:

1. **fasow-api:** Esta carpeta contiene la nueva versión de la biblioteca FASOW, la cual ha sido refactorizada y expuesta como una API HTTP. Esto permite que los experimentos y funcionalidades de la biblioteca se puedan acceder a través de solicitudes HTTP.

2. **fasow-monorepo:** Este subproyecto incluye la versión heredada de la biblioteca FASOW junto con un cliente que proporciona la interfaz necesaria para interactuar con los experimentos. Es útil para mantener compatibilidad con versiones anteriores y para usuarios que todavía dependen de la implementación legada.

## Estructura del Proyecto

```plaintext
FASOW/
│
├── fasow-api/          # Nueva versión de la biblioteca FASOW expuesta como API HTTP
│   ├── src/            # Código fuente de la API
│   ├── tests/          # Pruebas unitarias y de integración
│   └── README.md       # Documentación específica para fasow-api
│
└── fasow-monorepo/     # Biblioteca heredada y cliente para experimentos
    ├── src/            # Código fuente de la biblioteca y el cliente
    ├── tests/          # Pruebas unitarias y de integración
    └── README.md       # Documentación específica para fasow-monorepo
