// Enhanced Reading Settings Manager
class ReadingSettingsManager {
  constructor() {
    this.settings = {
      fontFamily: 'merriweather', // merriweather, crimson, source-serif, system
      fontSize: 'medium', // small, medium, large, xlarge
      lineHeight: 1.8, // 1.4 - 2.0
      theme: 'sepia', // light, sepia, dark
      letterSpacing: 'normal', // tight, normal, wide
      textAlign: 'justify', // left, justify
      showImages: true,
      autoSaveProgress: true
    };
    
    this.loadSettings();
    this.applySettings();
  }
  
  loadSettings() {
    const saved = localStorage.getItem('readingSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }
  
  saveSettings() {
    localStorage.setItem('readingSettings', JSON.stringify(this.settings));
  }
  
  updateSetting(key, value) {
    this.settings[key] = value;
    this.saveSettings();
    this.applySettings();
  }
  
  applySettings() {
    const body = document.body;
    
    // Apply theme
    body.className = `theme-${this.settings.theme}`;
    
    // Apply font family
    const fontFamilies = {
      merriweather: "'Merriweather', 'Source Serif 4', serif",
      crimson: "'Crimson Text', Georgia, serif",
      'source-serif': "'Source Serif 4', 'Times New Roman', serif",
      system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    };
    
    // Apply font size
    const fontSizes = {
      small: '1rem',
      medium: '1.125rem',
      large: '1.25rem',
      xlarge: '1.5rem'
    };
    
    // Apply letter spacing
    const letterSpacings = {
      tight: '-0.02em',
      normal: '0',
      wide: '0.025em'
    };
    
    // Create or update style element
    let styleEl = document.getElementById('reading-dynamic-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'reading-dynamic-styles';
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      .story-content,
      .reading-text,
      .chapter-content {
        font-family: ${fontFamilies[this.settings.fontFamily]} !important;
        font-size: ${fontSizes[this.settings.fontSize]} !important;
        line-height: ${this.settings.lineHeight} !important;
        letter-spacing: ${letterSpacings[this.settings.letterSpacing]} !important;
        text-align: ${this.settings.textAlign} !important;
      }
      
      .story-image {
        display: ${this.settings.showImages ? 'block' : 'none'} !important;
      }
    `;
  }
  
  createSettingsPanel() {
    return `
      <div class="reading-settings">
        <h3>⚙️ Cài Đặt Đọc Truyện</h3>
        
        <!-- Font Family -->
        <div class="setting-group">
          <label class="setting-label">Font Chữ</label>
          <div class="font-selector">
            <div class="font-option ${this.settings.fontFamily === 'merriweather' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('fontFamily', 'merriweather')">
              <div class="sample" style="font-family: 'Merriweather', serif;">Aa</div>
              <div class="name">Merriweather</div>
            </div>
            <div class="font-option ${this.settings.fontFamily === 'crimson' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('fontFamily', 'crimson')">
              <div class="sample" style="font-family: 'Crimson Text', serif;">Aa</div>
              <div class="name">Crimson</div>
            </div>
            <div class="font-option ${this.settings.fontFamily === 'source-serif' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('fontFamily', 'source-serif')">
              <div class="sample" style="font-family: 'Source Serif 4', serif;">Aa</div>
              <div class="name">Source Serif</div>
            </div>
            <div class="font-option ${this.settings.fontFamily === 'system' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('fontFamily', 'system')">
              <div class="sample" style="font-family: system-ui;">Aa</div>
              <div class="name">System</div>
            </div>
          </div>
        </div>
        
        <!-- Font Size -->
        <div class="setting-group">
          <label class="setting-label">Kích Thước Chữ</label>
          <div class="font-size-controls">
            <button class="font-size-btn ${this.settings.fontSize === 'small' ? 'active' : ''}" 
                    onclick="readingSettings.updateSetting('fontSize', 'small')">
              Nhỏ
            </button>
            <button class="font-size-btn ${this.settings.fontSize === 'medium' ? 'active' : ''}" 
                    onclick="readingSettings.updateSetting('fontSize', 'medium')">
              Vừa
            </button>
            <button class="font-size-btn ${this.settings.fontSize === 'large' ? 'active' : ''}" 
                    onclick="readingSettings.updateSetting('fontSize', 'large')">
              Lớn
            </button>
            <button class="font-size-btn ${this.settings.fontSize === 'xlarge' ? 'active' : ''}" 
                    onclick="readingSettings.updateSetting('fontSize', 'xlarge')">
              Rất Lớn
            </button>
          </div>
        </div>
        
        <!-- Line Height -->
        <div class="setting-group">
          <label class="setting-label">Khoảng Cách Dòng</label>
          <div class="line-height-control">
            <input type="range" 
                   class="line-height-slider" 
                   min="1.4" 
                   max="2.0" 
                   step="0.1" 
                   value="${this.settings.lineHeight}"
                   oninput="readingSettings.updateSetting('lineHeight', parseFloat(this.value)); document.querySelector('.line-height-value').textContent = this.value">
            <span class="line-height-value">${this.settings.lineHeight}</span>
          </div>
        </div>
        
        <!-- Theme -->
        <div class="setting-group">
          <label class="setting-label">Giao Diện</label>
          <div class="theme-selector">
            <div class="theme-option light ${this.settings.theme === 'light' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('theme', 'light')">
              <div style="font-size: 2rem; margin-bottom: 8px;">☀️</div>
              <div>Sáng</div>
            </div>
            <div class="theme-option sepia ${this.settings.theme === 'sepia' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('theme', 'sepia')">
              <div style="font-size: 2rem; margin-bottom: 8px;">📄</div>
              <div>Giấy</div>
            </div>
            <div class="theme-option dark ${this.settings.theme === 'dark' ? 'active' : ''}" 
                 onclick="readingSettings.updateSetting('theme', 'dark')">
              <div style="font-size: 2rem; margin-bottom: 8px;">🌙</div>
              <div>Tối</div>
            </div>
          </div>
        </div>
        
        <!-- Advanced Settings -->
        <div class="setting-group">
          <label class="setting-label">Nâng Cao</label>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" 
                     ${this.settings.showImages ? 'checked' : ''}
                     onchange="readingSettings.updateSetting('showImages', this.checked)"
                     style="width: 18px; height: 18px;">
              <span>Hiển thị hình ảnh</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" 
                     ${this.settings.autoSaveProgress ? 'checked' : ''}
                     onchange="readingSettings.updateSetting('autoSaveProgress', this.checked)"
                     style="width: 18px; height: 18px;">
              <span>Tự động lưu tiến độ đọc</span>
            </label>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize global instance
const readingSettings = new ReadingSettingsManager();

// Helper function to wrap story content
function wrapStoryContent(html) {
  return `
    <div class="reading-progress">
      <div class="reading-progress-bar" style="width: 0%"></div>
    </div>
    <div class="story-content">
      ${html}
    </div>
  `;
}

// Helper function to create chapter with image
function createChapterWithImage(title, imageUrl, content) {
  return `
    <div class="chapter-header">
      <img src="${imageUrl}" alt="${title}" class="chapter-header-image">
      <div class="chapter-header-overlay">
        <h1 class="chapter-header-title">${title}</h1>
      </div>
    </div>
    <div class="story-content">
      ${content}
    </div>
  `;
}

// Helper function to add story image
function addStoryImage(imageUrl, caption = '') {
  return `
    <figure>
      <img src="${imageUrl}" alt="${caption}" class="story-image">
      ${caption ? `<figcaption class="story-image-caption">${caption}</figcaption>` : ''}
    </figure>
  `;
}

// Track reading progress
function trackReadingProgress() {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', trackReadingProgress);
} else {
  trackReadingProgress();
}

// Export for use in other scripts
window.readingSettings = readingSettings;
window.wrapStoryContent = wrapStoryContent;
window.createChapterWithImage = createChapterWithImage;
window.addStoryImage = addStoryImage;
