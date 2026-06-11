# Guía para actualizar tu portafolio
## Jose David Medina · 2026-06-11

Tu portafolio está clonado en:
```
C:\Users\Jose Medina\.mavis\sessions\mvs_f961360918bd42f5ad889b1ceb0ccdaa\workspace\portfolio_real\
```

Archivos NUEVOS ya copiados (no tocar):
- `assets/photo.png` ← tu nueva foto con traje
- `assets/cv.pdf` ← CV actualizado con la nueva foto

Archivos a EDITAR (con cuidado, no rompas nada):
- `index.html` ← el archivo principal

---

## 📋 CAMBIO 1: Reemplazar tu nombre en el hero

**Busca en index.html** (con Ctrl+F):
```html
Jose David Medina
```

Vas a encontrarlo varias veces. Reemplaza SOLO el primer bloque (el del `<h1>` del hero) por:
```html
<h1 class="...">
    Hola, soy <span class="gradient-text">Jose David Medina</span>
</h1>
```

Mantén las clases que ya tiene, solo cambia el texto.

---

## 📋 CAMBIO 2: Actualizar la sección "Sobre mí"

**Busca** la sección `<section id="about">` o la que tenga tu descripción.
Reemplaza el texto de la bio con esto:

```html
<p class="...">
    Tecnólogo en Desarrollo de Sistemas Informáticos y estudiante de
    <strong>Ingeniería de Sistemas (7.º semestre)</strong> en la Universidad ECCI.
    Con 2+ años de experiencia en producción, especializado en
    <strong>PHP, Laravel, MySQL, Docker y Linux</strong>.
</p>
<p class="...">
    Mi trabajo destacado en Nethexa fue diseñar un pipeline de
    moderación automática de video integrando
    <strong>Speech-to-Text (Google) y Computer Vision (vía Perplexity API)</strong>
    para validar contenido generado por usuarios.
</p>
```

---

## 📋 CAMBIO 3: Agregar tu foto en la sección "Sobre mí"

**Busca** la sección "Sobre mí" y agrega esto donde quieras (arriba del texto está bien):

```html
<img
    src="assets/photo.png"
    alt="Jose David Medina"
    class="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-6 border-2 border-violet-500/50 shadow-lg object-cover"
/>
```

Si tu portafolio ya tiene el avatar, **NO lo agregues otra vez**. Solo actualiza el `src` para que apunte a `assets/photo.png`.

---

## 📋 CAMBIO 4: Actualizar los proyectos

**Busca** la sección `<!-- PROYECTOS -->` o donde estén los `article.project-card`.

Vas a encontrar 4 placeholders. Reemplaza los 4 con esto:

### Proyecto 1: Bookify Pro API
```html
<article class="project-card ...">
    <div class="text-7xl">01</div>
    <h3>Bookify Pro — API</h3>
    <p>SaaS multi-tenant de reservas. Laravel 12, Sanctum, MySQL. 32 tests automatizados.</p>
    <div class="flex flex-wrap gap-2">
        <span class="tech-tag">Laravel 12</span>
        <span class="tech-tag">PHP</span>
        <span class="tech-tag">MySQL</span>
        <span class="tech-tag">Sanctum</span>
        <span class="tech-tag">Multi-tenant</span>
    </div>
    <div class="flex gap-3 mt-4">
        <a href="https://github.com/JoseMedina-prog/bookify-api" class="...">Ver código →</a>
        <a href="#" class="...">Live demo</a>
    </div>
</article>
```

### Proyecto 2: Bookify Pro Frontend
```html
<article class="project-card ...">
    <div class="text-7xl">02</div>
    <h3>Bookify Pro — Frontend</h3>
    <p>Frontend del SaaS. Angular 21, Tailwind 4, TypeScript. Panel admin completo.</p>
    <div class="flex flex-wrap gap-2">
        <span class="tech-tag">Angular 21</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">Tailwind</span>
    </div>
    <div class="flex gap-3 mt-4">
        <a href="https://github.com/JoseMedina-prog/bookify-client" class="...">Ver código →</a>
    </div>
</article>
```

### Proyecto 3: StockFlow
```html
<article class="project-card ...">
    <div class="text-7xl">03</div>
    <h3>StockFlow</h3>
    <p>ERP/CRM integral para PyMEs. Laravel 12, Vue 3, Inertia v2, TypeScript.</p>
    <div class="flex flex-wrap gap-2">
        <span class="tech-tag">Laravel 12</span>
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">Inertia</span>
        <span class="tech-tag">TypeScript</span>
    </div>
    <div class="flex gap-3 mt-4">
        <a href="https://github.com/JoseMedina-prog/stockflow" class="...">Ver código →</a>
    </div>
</article>
```

### Proyecto 4: WalletWise
```html
<article class="project-card ...">
    <div class="text-7xl">04</div>
    <h3>WalletWise</h3>
    <p>App de finanzas personales. Laravel 12, MySQL, Tailwind, Chart.js. Multi-tenant.</p>
    <div class="flex flex-wrap gap-2">
        <span class="tech-tag">Laravel 12</span>
        <span class="tech-tag">MySQL</span>
        <span class="tech-tag">Chart.js</span>
    </div>
    <div class="flex gap-3 mt-4">
        <a href="https://github.com/JoseMedina-prog/walletwise" class="...">Ver código →</a>
    </div>
</article>
```

---

## 📋 CAMBIO 5: Actualizar links de contacto

**Busca** `tu-usuario` y reemplaza por:
- GitHub: `https://github.com/JoseMedina-prog`
- LinkedIn: `https://www.linkedin.com/in/jose-david-medina-gonzález-581a9a187/`
- Email: `mailto:jodago1233@gmail.com`

---

## 📋 CAMBIO 6: Agregar botón "Descargar CV" en contacto

**Busca** la sección de contacto y agrega un botón nuevo:

```html
<a href="assets/cv.pdf" download class="...">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    Descargar CV
</a>
```

Pónlo junto a los otros botones de contacto. Usa las clases que ya tienen tus otros botones (probablemente algo como `btn-secondary` o `bg-violet-500/10`).

---

## 📋 CAMBIO 7: Actualizar Open Graph y meta description

**Busca**:
```html
<meta name="description" content="..." />
```

Reemplaza con:
```html
<meta name="description" content="Portafolio de Jose David Medina — Desarrollador Backend PHP/Laravel especializado en SQL, Docker y Linux. 4 proyectos open source y experiencia en Computer Vision." />
```

Y los Open Graph también:
```html
<meta property="og:title" content="Jose David Medina — Backend Developer PHP/Laravel" />
<meta property="og:description" content="Desarrollador Backend con 2+ años de experiencia. Tecnólogo en Ing. de Sistemas. Disponible para nuevos retos." />
```

---

## ✅ CHECKLIST ANTES DE SUBIR

Cuando termines, verifica:

- [ ] El sitio abre sin errores en `http://localhost:5500` (con Live Server)
- [ ] Las animaciones siguen funcionando (no rompiste nada del JS)
- [ ] La foto nueva aparece en la sección "Sobre mí"
- [ ] Los 4 proyectos tienen los links correctos a tus repos
- [ ] El botón "Descargar CV" baja el PDF nuevo
- [ ] Los links de LinkedIn y GitHub funcionan
- [ ] El sitio se ve bien en móvil (resize la ventana)

---

## 🚀 CÓMO SUBIR LOS CAMBIOS A GITHUB PAGES

Una vez que todo esté bien localmente:

### Por la web (3 min):
1. Abre https://github.com/JoseMedina-prog/JoseMedina-prog.github.io
2. Click en cada archivo que modificaste → pencil icon → pega los cambios → "Commit changes"
3. Para los archivos NUEVOS (assets/photo.png, assets/cv.pdf):
   - Click en "Add file" → "Upload files"
   - Arrastra los 2 archivos
4. En 1-2 minutos se actualiza en https://JoseMedina-prog.github.io

### Por terminal (si tienes git configurado):
```powershell
cd "C:\Users\Jose Medina\.mavis\sessions\mvs_f961360918bd42f5ad889b1ceb0ccdaa\workspace\portfolio_real"
git add .
git commit -m "Actualizar portafolio: nueva foto, CV descargable, proyectos reales"
git push
```

---

## 🆘 Si te trabas

Si en algún cambio el portafolio deja de verse bien:
1. Abre la consola del navegador (F12)
2. Mira los errores en rojo
3. Si dice "404" en assets/photo.png, revisa que la carpeta assets/ exista
4. Si las animaciones no funcionan, es probable que tocaras accidentalmente el `<script>` de GSAP o Three.js — Ctrl+Z hasta que vuelva

Si nada funciona, me avisas y lo vemos juntos paso a paso.

---

## 💡 Después de terminar

Avísame y te ayudo con:
- Revisar el sitio final
- Actualizar el CV de Computrabajo si es necesario
- Aplicar a las 3 vacantes top que te encontré (Colegium, Listos, Perceptual)
- Prepararte para preguntas de entrevista sobre los proyectos
