/**
 * AudioManager - Gestionnaire audio pour le jeu du nombre mystère
 * Gère la musique de fond et les effets sonores avec contrôles utilisateur
 */

class AudioManager {
  constructor() {
    // Chemins des fichiers audio
    this.sounds = {
      background: 'assets/audio/background-music.mp3',
      correct: 'assets/audio/correct.mp3',
      wrong: 'assets/audio/wrong.mp3',
      easterEgg67: 'assets/audio/easter-egg-67.mp3'
    };

    // Éléments audio HTML
    this.audioElements = {};
    
    // État des préférences (chargé depuis localStorage)
    this.preferences = {
      musicEnabled: true,
      sfxEnabled: true,
      musicVolume: 0.3,
      sfxVolume: 0.5
    };

    // État interne
    this.initialized = false;
    this.backgroundMusicStarted = false;

    // Charger les préférences depuis localStorage
    this.loadPreferences();
    
    // Créer les éléments audio
    this.createAudioElements();
    
    // Créer les contrôles UI
    this.createControls();
    
    // Gérer l'autoplay après interaction utilisateur
    this.setupAutoplayHandler();
  }

  /**
   * Charge les préférences depuis localStorage
   */
  loadPreferences() {
    const saved = localStorage.getItem('audioPreferences');
    if (saved) {
      try {
        this.preferences = { ...this.preferences, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Erreur lors du chargement des préférences audio:', e);
      }
    }
  }

  /**
   * Sauvegarde les préférences dans localStorage
   */
  savePreferences() {
    try {
      localStorage.setItem('audioPreferences', JSON.stringify(this.preferences));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des préférences audio:', e);
    }
  }

  /**
   * Crée les éléments audio HTML
   */
  createAudioElements() {
    Object.entries(this.sounds).forEach(([name, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      
      // Configuration spéciale pour la musique de fond
      if (name === 'background') {
        audio.loop = true;
        audio.volume = this.preferences.musicVolume;
      } else {
        audio.volume = this.preferences.sfxVolume;
      }
      
      this.audioElements[name] = audio;
    });
  }

  /**
   * Crée les contrôles UI dans le header
   */
  createControls() {
    // Sur mobile (<=720px), insérer dans le menu
    // Sur desktop, position fixe en haut à droite
    const isMobile = window.innerWidth <= 720;
    
    let container;
    if (isMobile) {
      // Insérer dans le menu de navigation
      const navPanel = document.querySelector('.site-nav__panel');
      if (!navPanel) return;
      
      container = document.createElement('div');
      container.className = 'audio-controls audio-controls--mobile';
      navPanel.appendChild(container);
    } else {
      // Insérer dans le body pour position fixe
      container = document.createElement('div');
      container.className = 'audio-controls audio-controls--desktop';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <label class="audio-controls__label">
        <input type="checkbox" class="nes-checkbox is-dark" id="toggle-music" ${this.preferences.musicEnabled ? 'checked' : ''} />
        <span>🎵 Musique</span>
      </label>
      <label class="audio-controls__label">
        <input type="checkbox" class="nes-checkbox is-dark" id="toggle-sfx" ${this.preferences.sfxEnabled ? 'checked' : ''} />
        <span>🔊 Effets</span>
      </label>
    `;

    // Event listeners pour les checkboxes
    document.getElementById('toggle-music').addEventListener('change', (e) => {
      this.toggleMusic(e.target.checked);
    });

    document.getElementById('toggle-sfx').addEventListener('change', (e) => {
      this.toggleSFX(e.target.checked);
    });

    // Recréer les contrôles si la fenêtre est redimensionnée
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wassMobile = document.querySelector('.audio-controls--mobile') !== null;
        const isNowMobile = window.innerWidth <= 720;
        
        if (wassMobile !== isNowMobile) {
          // Supprimer les anciens contrôles
          const oldControls = document.querySelector('.audio-controls');
          if (oldControls) oldControls.remove();
          
          // Recréer
          this.createControls();
        }
      }, 250);
    });

    // Raccourcis clavier
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      
      if (e.key.toLowerCase() === 'm') {
        this.toggleMusic();
      } else if (e.key.toLowerCase() === 's') {
        this.toggleSFX();
      }
    });
  }

  /**
   * Configure le gestionnaire d'autoplay (nécessite interaction utilisateur)
   */
  setupAutoplayHandler() {
    const startMusic = () => {
      if (!this.backgroundMusicStarted && this.preferences.musicEnabled) {
        this.startBackgroundMusic();
        this.backgroundMusicStarted = true;
      }
      // Retirer les listeners après la première interaction
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };

    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
  }

  /**
   * Démarre la musique de fond
   */
  startBackgroundMusic() {
    if (this.audioElements.background && this.preferences.musicEnabled) {
      this.audioElements.background.play().catch(e => {
        console.log('Impossible de démarrer la musique:', e);
      });
    }
  }

  /**
   * Joue un effet sonore
   * @param {string} soundName - Nom du son (correct, wrong, easterEgg67)
   */
  playSound(soundName) {
    if (!this.preferences.sfxEnabled) return;
    
    const audio = this.audioElements[soundName];
    if (!audio) {
      console.warn(`Son "${soundName}" introuvable`);
      return;
    }

    // Réinitialiser et jouer
    audio.currentTime = 0;
    audio.play().catch(e => {
      console.log(`Impossible de jouer le son "${soundName}":`, e);
    });
  }

  /**
   * Toggle musique
   * @param {boolean} enabled - État (optionnel, sinon toggle)
   */
  toggleMusic(enabled) {
    if (typeof enabled === 'boolean') {
      this.preferences.musicEnabled = enabled;
    } else {
      this.preferences.musicEnabled = !this.preferences.musicEnabled;
    }
    this.savePreferences();
    
    const checkbox = document.getElementById('toggle-music');
    if (checkbox) {
      checkbox.checked = this.preferences.musicEnabled;
    }
    
    if (this.preferences.musicEnabled) {
      this.startBackgroundMusic();
    } else {
      if (this.audioElements.background) {
        this.audioElements.background.pause();
      }
    }
  }

  /**
   * Toggle effets sonores
   * @param {boolean} enabled - État (optionnel, sinon toggle)
   */
  toggleSFX(enabled) {
    if (typeof enabled === 'boolean') {
      this.preferences.sfxEnabled = enabled;
    } else {
      this.preferences.sfxEnabled = !this.preferences.sfxEnabled;
    }
    this.savePreferences();
    
    const checkbox = document.getElementById('toggle-sfx');
    if (checkbox) {
      checkbox.checked = this.preferences.sfxEnabled;
    }
  }

  /**
   * Définit le volume de la musique
   * @param {number} volume - Volume entre 0 et 1
   */
  setMusicVolume(volume) {
    this.preferences.musicVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
    
    if (this.audioElements.background) {
      this.audioElements.background.volume = this.preferences.musicVolume;
    }
  }

  /**
   * Définit le volume des effets sonores
   * @param {number} volume - Volume entre 0 et 1
   */
  setSFXVolume(volume) {
    this.preferences.sfxVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
    
    // Appliquer à tous les effets sonores
    Object.entries(this.audioElements).forEach(([name, audio]) => {
      if (name !== 'background') {
        audio.volume = this.preferences.sfxVolume;
      }
    });
  }
}

// Créer une instance globale
const audioManager = new AudioManager();
