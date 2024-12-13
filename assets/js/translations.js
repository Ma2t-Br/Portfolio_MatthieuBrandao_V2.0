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
        // Parcourir toutes les sections du fichier de traduction
        for (const section in this.translations) {
            for (const key in this.translations[section]) {
                // Utiliser querySelectorAll au lieu de querySelector
                const elements = document.querySelectorAll(`[data-translate="${key}"]`);
                if (elements && this.translations[section][key][this.currentLanguage]) {
                    // Parcourir tous les éléments trouvés
                    elements.forEach(element => {
                        element.textContent = this.translations[section][key][this.currentLanguage];
                    });
                }
            }
        }
    }
}

// Initialiser le gestionnaire de traductions quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new TranslationManager();
}); 