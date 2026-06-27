# Aura Flowers

Pequeña aplicación React creada con Vite para generar y mostrar flores animadas.

## Requisitos

- Node.js 18+ y npm
- Git

## Instalación

1. Clona el repositorio (o trabaja en tu copia local):

	```bash
	git clone https://github.com/Castillooog/aura-flower.git
	cd aura-flower
	```

2. Instala dependencias:

	```bash
	npm install
	```

3. Crea un fichero `.env` en la raíz (NO subirlo al repositorio) y añade las variables necesarias, por ejemplo:

	```env
	GROQ_API_KEY=tu_clave_secreta
	```

	- Nota: ya eliminamos `.env` del historial por seguridad. Si la clave fue expuesta, rótala/regenérala en el servicio correspondiente.

## Desarrollo

Inicia el servidor de desarrollo con HMR:

```bash
npm run dev
```

Accede a `http://localhost:5173` (o la URL que indique Vite).

## Build y preview

Genera la versión de producción y prueba localmente:

```bash
npm run build
npm run preview
```

## Despliegue

Opciones recomendadas:

- Vercel: Conecta el repositorio, añade la variable de entorno `GROQ_API_KEY` en las settings del proyecto en Vercel y despliega.
- GitHub: Puedes usar GitHub Actions para construir y desplegar; en cualquier caso añade `GROQ_API_KEY` en los Secrets del repositorio (Settings → Secrets).

## Seguridad y buenas prácticas

- Nunca comites `.env` ni claves en el repositorio público.
- Si subiste una clave por error, rótala inmediatamente y elimina el archivo del historial (ya se eliminó `.env` del historial local y se forzó el push para limpiar el remoto).

## Repo

Repositorio remoto: https://github.com/Castillooog/aura-flower

Si quieres, puedo:

- Añadir un workflow de CI (GitHub Actions) para build y deploy a Vercel.
- Configurar GitHub Pages o `gh-pages` si prefieres esa opción.
- Generar un `README` traducido en inglés también.

Dime qué prefieres y lo hago.
