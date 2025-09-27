# 📧 Configuración de EmailJS para el Formulario de Contacto

## 🎯 Objetivo
Configurar EmailJS para que el formulario de contacto envíe emails directamente a: **ramisoaresgache@hotmail.com**

## 📋 Pasos para Configurar EmailJS

### 1. Registrarse en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### 2. Crear un Servicio de Email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (recomendado: **Gmail** o **Outlook**)
4. Configura con tu email: **ramisoaresgache@hotmail.com**
5. Anota el **Service ID** que se genera

### 3. Crear una Plantilla de Email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

```
Asunto: Nuevo mensaje de contacto - {{subject}}

Hola,

Has recibido un nuevo mensaje desde tu sitio web Big Consulting:

Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este email fue enviado automáticamente desde el formulario de contacto de tu sitio web.
```

4. Anota el **Template ID** que se genera

### 4. Obtener la Public Key
1. Ve a "Account" en el menú
2. Copia tu **Public Key**

### 5. Actualizar el Código
En el archivo `script.js`, reemplaza:

```javascript
// Línea ~30
emailjs.init("YOUR_PUBLIC_KEY");
// Cambiar por:
emailjs.init("tu_public_key_aqui");

// Línea ~795
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// Cambiar por:
emailjs.send('tu_service_id_aqui', 'tu_template_id_aqui', templateParams)
```

## 🔧 Configuración Completa

### En script.js, busca y reemplaza:
1. `YOUR_PUBLIC_KEY` → Tu Public Key de EmailJS
2. `YOUR_SERVICE_ID` → Tu Service ID de EmailJS  
3. `YOUR_TEMPLATE_ID` → Tu Template ID de EmailJS

## ✅ Verificar que Funcione

1. Guarda los cambios
2. Abre tu sitio web
3. Llena el formulario de contacto
4. Envía un mensaje de prueba
5. Revisa tu email **ramisoaresgache@hotmail.com**

## 🚀 Plan Gratuito de EmailJS

- ✅ 200 emails gratis por mes
- ✅ Perfecto para un sitio de consultoría
- ✅ Sin costos hasta que necesites más volumen

## 🆘 Si Tienes Problemas

1. Verifica que todos los IDs estén correctos
2. Revisa la consola del navegador para errores
3. Asegúrate de que el servicio de email esté activo en EmailJS
4. La plantilla debe usar exactamente los nombres de variables del código

## 📝 Campos del Formulario

El formulario envía estos datos:
- **from_name**: Nombre del usuario
- **from_email**: Email del usuario  
- **company**: Empresa (opcional)
- **subject**: Asunto del mensaje
- **message**: Mensaje completo
- **to_email**: ramisoaresgache@hotmail.com (destinatario)

¡Una vez configurado, recibirás todos los mensajes del formulario directamente en tu email!