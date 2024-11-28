const i18n = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');

i18n.use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    welcome: "Welcome",
                    file_uploaded: "File uploaded successfully!",
                    // Add more translations here
                }
            },
            es: {
                translation: {
                    welcome: "Bienvenido",
                    file_uploaded: "¡Archivo subido con éxito!",
                    // Add more translations here
                }
            }
        }
    });

module.exports = { i18n, i18nextMiddleware };