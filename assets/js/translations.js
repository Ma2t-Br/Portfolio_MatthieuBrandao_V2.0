class TranslationManager {
    constructor() {
        this.currentLanguage = 'Fr';
        this.translations = null;
        this.languageToggle = document.getElementById('languageToggle');
        this.languageText = document.getElementById('languageText');
        
        this.init();
    }

    async init() {
        try {
            // Charger le fichier de traductions
            const response = await fetch('assets/json/translations.json');
            this.translations = await response.json();
            
            // Initialiser les événements
            this.setupEventListeners();
            
            // Appliquer la langue par défaut
            this.updateContent();
            
        } catch (error) {
            console.error('Erreur lors du chargement des traductions:', error);
        }
    }

    setupEventListeners() {
        this.languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'Fr' ? 'En' : 'Fr';
        this.languageText.textContent = this.currentLanguage === 'Fr' ? 'EN' : 'FR';
        this.updateContent();
    }

    updateContent() {
        const updateTranslation = (obj, prefix = '') => {
            for (const key in obj) {
                // Vérifie si l'objet contient au moins une traduction
                if (typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0) {
                    // Vérifie si c'est un objet de traductions (contient la langue courante)
                    if (obj[key][this.currentLanguage]) {
                        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
                        if (elements.length > 0) {
                            elements.forEach(element => {
                                element.textContent = obj[key][this.currentLanguage];
                            });
                        } else {
                            console.log(`Traduction non utilisée : ${key}`);
                        }
                    } else {
                        // Continue la récursion pour les objets imbriqués
                        updateTranslation(obj[key], `${prefix}${key}.`);
                    }
                }
            }
        };

        updateTranslation(this.translations);
    }
}

// Initialiser le gestionnaire de traductions quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new TranslationManager();
}); 