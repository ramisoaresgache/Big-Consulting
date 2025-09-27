# 🚀 GUÍA RÁPIDA: Configurar EmailJS en 5 minutos

## ⚠️ PROBLEMA ACTUAL
El formulario funciona pero NO envía emails reales porque EmailJS necesita configuración.

## ✅ SOLUCIÓN RÁPIDA (5 minutos)

### 1️⃣ Ir a EmailJS
- Abre: https://www.emailjs.com/
- Haz clic en "Sign Up"
- Regístrate con: **ramisoaresgache@hotmail.com**

### 2️⃣ Crear Servicio (1 minuto)
- Ve a "Email Services"
- Clic en "Add New Service"
- Selecciona **"Outlook"** (para Hotmail)
- Pon tu email: **ramisoaresgache@hotmail.com**
- Copia el **Service ID** (ejemplo: service_abc123)

### 3️⃣ Crear Template (1 minuto)
- Ve a "Email Templates"
- Clic en "Create New Template"
- Pega esto en el contenido:

```
Asunto: Contacto Big Consulting - {{subject}}

Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde: Big Consulting Website
```

- Copia el **Template ID** (ejemplo: template_xyz456)

### 4️⃣ Obtener Public Key (30 segundos)
- Ve a "Account" → "General"
- Copia tu **Public Key** (ejemplo: user_789def)

### 5️⃣ Actualizar el Código (2 minutos)
En `script.js` busca y reemplaza:

```javascript
// Línea ~30: Cambiar esto:
emailjs.init("YOUR_PUBLIC_KEY");
// Por esto:
emailjs.init("user_789def"); // TU PUBLIC KEY AQUÍ

// Línea ~35: Agregar esta línea:
window.EMAILJS_CONFIGURED = true;

// Línea ~810: Cambiar esto:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// Por esto:
emailjs.send('service_abc123', 'template_xyz456', templateParams) // TUS IDs AQUÍ
```

## 🎯 EJEMPLO COMPLETO
Si tus credenciales fueran:
- Public Key: `user_abc123`
- Service ID: `service_xyz789` 
- Template ID: `template_def456`

El código quedaría:
```javascript
emailjs.init("user_abc123");
window.EMAILJS_CONFIGURED = true;
// ...
emailjs.send('service_xyz789', 'template_def456', templateParams)
```

## ✅ PROBAR
1. Guarda los cambios
2. Recarga la página
3. Llena el formulario
4. Envía un mensaje
5. ¡Revisa tu email!

## 🆘 ALTERNATIVA SÚPER RÁPIDA
Si no quieres configurar EmailJS ahora, usa **Formspree**:
1. Ve a https://formspree.io/
2. Crea cuenta con tu email
3. Obten tu endpoint (ejemplo: https://formspree.io/f/abc123)
4. En `script.js` línea ~825, cambia:
   ```javascript
   tempForm.action = 'https://formspree.io/f/abc123'; // TU ENDPOINT AQUÍ
   ```

## 📞 RESULTADO
Una vez configurado, recibirás emails así:

**Para:** ramisoaresgache@hotmail.com  
**Asunto:** Contacto Big Consulting - [asunto del usuario]  
**Contenido:** Todos los datos del formulario

¡En 5 minutos tendrás el formulario funcionando al 100%! 🎉