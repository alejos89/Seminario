# Sistema de Seguridad - Misión Ciudadanía Digital

Sitio web educativo con temática **hacker / terminal**.  
Simula un sistema de acceso por PIN de 8 dígitos.

## Estructura de carpetas

```
seguridad-hacker/
├── index.html          ← Página principal
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   └── main.js         ← Lógica del PIN y animaciones
├── assets/             ← (vacío, listo para imágenes si las necesitas)
└── README.md           ← Este archivo
```

## Cómo funciona

1. El usuario ve la pantalla **"Ingresa el PIN"**.
2. Escribe un código de **exactamente 8 dígitos**.
3. Al pulsar **VERIFICAR** (o Enter) aparece la animación de verificación con barras de progreso.
4. **Si el PIN es correcto** → se muestra el candado abierto, "ACCESO CONCEDIDO", "MISIÓN COMPLETADA" y la tarjeta con el mensaje sobre ser un buen ciudadano digital.
5. **Si el PIN es incorrecto** → se muestra "ACCESO DENEGADO" y un botón para reintentar.

## Cómo cambiar el PIN correcto

Abre el archivo `js/main.js` y busca esta línea cerca del principio:

```js
const CORRECT_PIN = "12345678";
```

Cambia `"12345678"` por el código de 8 dígitos que quieras (siempre entre comillas y solo números).

## Cómo personalizar

### Colores y tema
En `css/styles.css` están las variables al inicio:

```css
:root {
  --bg-color: #0a0a0a;
  --text-primary: #00ff41;   /* Verde principal */
  --text-error: #ff3333;     /* Rojo de error */
  /* ... */
}
```

### Textos
- Mensaje de éxito: está dentro de `index.html` en la sección con clase `.card-message`.
- Mensajes de error y títulos: también en `index.html`.
- Textos de la animación de verificación: en `js/main.js` dentro del array `statusMessages`.

### Duración de la animación
En `js/main.js`:

```js
const VERIFY_DURATION = 2800;  // milisegundos
```

## Cómo abrir el sitio

Simplemente abre el archivo `index.html` en cualquier navegador moderno  
(Chrome, Firefox, Edge, Safari…). No necesita servidor.

## Características incluidas

- Diseño responsive (se adapta a móvil y escritorio)
- Solo acepta números en el PIN
- Animación de barras de progreso estilo terminal
- Efecto de scanlines (como monitor antiguo)
- Tema visual de hacker (fondo oscuro + verde neón)
- Código limpio y comentado para que sea fácil de modificar
- Accesibilidad básica (ARIA, focus visible, reduced-motion)

---

Hecho para uso educativo sobre ciudadanía digital.
