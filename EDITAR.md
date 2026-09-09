# Editar PAWWER

Proyecto único: D:\CC MKT 2025\Creativo Coyote Web\Synplo\PAWWDER Landing\PAWWER-landing-editable

1. Abre /admin en tu dominio e inicia sesión con GitHub.
2. Entra en Contenido · Español y abre la página. El editor visual se abre ampliado.
3. Haz clic en una sección de la página: sus campos se abren a la izquierda. También puedes elegirla en el selector de secciones.
4. Cambia textos en los campos o haz doble clic en un titular o párrafo de la página. Haz clic fuera para aplicar la edición directa.
5. Para imágenes: pulsa Elegir imagen en la sección. Selecciona una de la biblioteca o usa Subir nuevo. Las fotos entregadas están en public/img.
6. Para video de portada: cambia Medio a video, carga un MP4 en Video y elige su imagen de portada. También puedes insertar una URL HTTPS de video alojado. Los videos grandes conviene alojarlos externamente para evitar los límites de GitHub.
7. En Portada, usa ¿Dónde aparece?, encuadre, altura y oscurecimiento para ajustar el fondo.
8. Usa Computadora, Tableta y Celular para ver el resultado.
9. Pulsa Volver a guardar / publicar. Guarda el borrador y publica cuando esté listo. Vercel reconstruye el sitio tras publicar; no se actualiza de forma instantánea.

El guardado sigue usando la autenticación existente de GitHub. El lienzo no tiene credenciales ni escribe directamente al repositorio. Los mensajes entre editor y preview se limitan al mismo origen y a campos permitidos. El OAuth existente continúa en el servidor.

El editor es por secciones: permite reordenar, agregar bloques y modificar medios/textos; no es un lienzo libre para colocar cualquier elemento en cualquier coordenada.

Pruebas realizadas: compilación de producción, edición de titular con actualización en preview, selección del bloque de producto desde el lienzo, apertura de biblioteca. La publicación remota y la carga final a GitHub requieren la sesión real del propietario; la prueba local usa datos de prueba.

Portada: Medio=image muestra el carrusel de fotografías (ordénalas en Carrusel de imágenes). Medio=video muestra únicamente el video; no monta las fotos ni los controles del carrusel. Si no hay diapositivas, image usa la imagen alternativa.
