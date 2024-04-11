document.addEventListener('DOMContentLoaded', function() {
    fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
            const userLang = navigator.language.split('-')[0]; // Obtenez la langue principale de l'utilisateur
            const defaultLang = 'en'; // Langue par défaut

            // Charger les traductions correspondant à la langue de l'utilisateur, ou à la langue par défaut
            const langTranslations = translations[userLang] || translations[defaultLang];

            // Parcourir le document et remplacer les balises de traduction par les traductions appropriées
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (langTranslations[key]) {
                    element.innerHTML = langTranslations[key];
                }
            });
        })
        .then(() => console.log('Translation {} loaded!'))
        .catch(error => console.error('Error loading translations:', error));
});