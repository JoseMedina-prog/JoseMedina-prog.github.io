# Portafolio · Jose David Medina

Portafolio personal con diseño moderno, animaciones fluidas y fondo 3D.

## Stack

- **HTML5** semántico
- **Tailwind CSS** (vía CDN, sin build)
- **Three.js** para el fondo 3D del hero
- **GSAP + ScrollTrigger** para animaciones de scroll
- **Lenis** para scroll suave
- **CSS custom** para efectos (cursor, gradientes, glassmorphism)

## Cómo abrirlo

### Opción 1: Doble click en `index.html`

Funciona tal cual. Solo necesitas un navegador moderno (Chrome, Edge, Firefox).

### Opción 2: Con VS Code + Live Server (recomendado)

1. Abre la carpeta en VS Code
2. Instala la extensión **Live Server** (si no la tienes)
3. Click derecho en `index.html` → "Open with Live Server"
4. Se abre en `http://localhost:5500` y se recarga sola cuando editas

## Cómo personalizarlo

### 1. Tu información

Edita `index.html` y busca:

- Tu nombre en el `<h1>` del hero (línea ~80)
- El email en la sección de contacto (busca `mailto:`)
- El usuario de GitHub (busca `tu-usuario`)
- Links de LinkedIn / Twitter en la sección de contacto

### 2. Tus proyectos

En `index.html`, busca la sección `<!-- PROYECTOS -->`. Hay 4 `article.project-card` con placeholders. Reemplaza:

- **Nombre** del proyecto
- **Descripción**
- **Stack** (las etiquetas pequeñas)
- **`href="#"`** en "Ver código" y "Live demo" por tus URLs reales
- Si tienes screenshot, reemplaza el `<div class="text-7xl">0X</div>` por `<img src="ruta/a/tu/imagen.png" />`

### 3. Colores

Los acentos están definidos en `tailwind.config` dentro de `<script>` en el `<head>`:

```js
colors: {
    ink: '#0a0a0f',           // fondo
    accent: {
        violet: '#8b5cf6',    // morado principal
        cyan: '#06b6d4',      // cyan
        pink: '#ec4899',      // rosa
    }
}
```

También puedes tocar el gradiente en `.gradient-text` (en `styles.css`).

### 4. Foto tuya (opcional)

Si quieres foto en la sección "Sobre mí", agrega un `<img>` en el grid.

## Cómo publicarlo gratis en GitHub Pages

1. Sube esta carpeta a un repo nuevo en GitHub (ej: `portfolio` o `tu-usuario.github.io`)
2. Ve a **Settings → Pages**
3. En "Source" elige **Deploy from a branch**
4. Branch: `main`, carpeta: `/ (root)`
5. Guarda. En 1-2 minutos tu portafolio está en `https://tu-usuario.github.io`

### Con dominio propio (opcional)

- Compra un dominio en Namecheap, Google Domains, etc.
- En el repo, crea un archivo `CNAME` con tu dominio
- Configura los DNS según las instrucciones de tu proveedor

## Estructura de archivos

```
portfolio/
├── index.html        # Todo el contenido
├── styles.css        # Estilos custom
├── three-bg.js       # Fondo 3D del hero
├── cursor.js         # Cursor custom
├── app.js            # Lenis + GSAP + interacciones
└── README.md         # Este archivo
```

## Cosas opcionales para más adelante

- **Más objetos 3D** en `three-bg.js` (cambia la geometría)
- **Cursor con texto** en hover (se complica un poco, dime si quieres)
- **Sección de blog** con markdown
- **i18n** (versión en inglés)

## ¿Algo no funciona?

Las causas más comunes:

1. **No se ve el 3D** → abre la consola (F12), probablemente algún CDN no cargó. Verifica internet.
2. **Las animaciones no se ven** → ScrollTrigger necesita JS cargado. Refresca con Ctrl+Shift+R (limpia caché).
3. **Cursor no aparece** → solo se activa en desktop, no en móvil.

---

Hecho por Jose David Medina en Cali, Colombia 🇨🇴
