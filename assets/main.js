// Simple Vanilla JS App - No React needed
class StorageManager {
  constructor() {
    this.dbName = 'TamThienDB';
    this.version = 1;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('games')) {
          db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async saveGame(gameData) {
    const tx = this.db.transaction('games', 'readwrite');
    const store = tx.objectStore('games');
    return new Promise((resolve, reject) => {
      const request = store.add({ ...gameData, updatedAt: Date.now() });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllGames() {
    const tx = this.db.transaction('games', 'readonly');
    const store = tx.objectStore('games');
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    });
  }

  async deleteGame(id) {
    const tx = this.db.transaction('games', 'readwrite');
    const store = tx.objectStore('games');
    return new Promise((resolve) => {
      store.delete(id);
      resolve();
    });
  }

  async getSetting(key, defaultValue = null) {
    const tx = this.db.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    return new Promise((resolve) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value || defaultValue);
      request.onerror = () => resolve(defaultValue);
    });
  }

  async saveSetting(key, value) {
    const tx = this.db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    return new Promise((resolve) => {
      store.put({ key, value });
      resolve();
    });
  }
}

// App State
const state = {
  screen: 'menu',
  games: [],
  currentGame: null,
  theme: 'dark',
  apiKey: ''
};

const storage = new StorageManager();

// Render Functions
function render() {
  const root = document.getElementById('root');
  
  switch (state.screen) {
    case 'menu':
      root.innerHTML = renderMenu();
      break;
    case 'newgame':
      root.innerHTML = renderNewGame();
      break;
    case 'savedgames':
      root.innerHTML = renderSavedGames();
      break;
    case 'settings':
      root.innerHTML = renderSettings();
      break;
    case 'game':
      root.innerHTML = renderGame();
      break;
  }
  
  attachEventListeners();
}

function renderMenu() {
  return `
    <div class="screen menu-screen">
      <div class="logo">🌏</div>
      <h1 class="title">Tam Thiên Thế Giới</h1>
      <p class="subtitle">Trò chơi kể chuyện tương tác với AI</p>
      
      <div class="menu-buttons">
        <button class="btn btn-primary" data-action="newgame">
          ✨ Trò Chơi Mới
        </button>
        <button class="btn btn-secondary" data-action="savedgames">
          💾 Trò Chơi Đã Lưu (${state.games.length})
        </button>
        <button class="btn btn-secondary" data-action="settings">
          ⚙️ Cài Đặt
        </button>
      </div>
      
      <div class="footer">
        <p>v2.0 - Clean Edition</p>
      </div>
    </div>
  `;
}

function renderNewGame() {
  return `
    <div class="screen">
      <button class="btn-back" data-action="menu">← Quay lại</button>
      <h2>✨ Trò Chơi Mới</h2>
      
      <div class="form-group">
        <label>Tên trò chơi:</label>
        <input type="text" id="game-title" class="input" placeholder="Ví dụ: Hành trình tu tiên">
      </div>
      
      <div class="form-group">
        <label>Mô tả:</label>
        <textarea id="game-description" class="textarea" rows="4" placeholder="Mô tả ngắn về câu chuyện..."></textarea>
      </div>
      
      <button class="btn btn-primary" data-action="create-game">
        Tạo Trò Chơi
      </button>
    </div>
  `;
}

function renderSavedGames() {
  if (state.games.length === 0) {
    return `
      <div class="screen">
        <button class="btn-back" data-action="menu">← Quay lại</button>
        <h2>💾 Trò Chơi Đã Lưu</h2>
        <p class="empty-state">Chưa có trò chơi nào. Tạo trò chơi mới để bắt đầu!</p>
      </div>
    `;
  }
  
  const gamesHTML = state.games.map(game => `
    <div class="game-card">
      <h3>${game.title || 'Untitled'}</h3>
      <p>${game.description || 'Không có mô tả'}</p>
      <div class="game-actions">
        <button class="btn btn-small" data-action="play-game" data-id="${game.id}">Chơi</button>
        <button class="btn btn-small btn-danger" data-action="delete-game" data-id="${game.id}">Xóa</button>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="screen">
      <button class="btn-back" data-action="menu">← Quay lại</button>
      <h2>💾 Trò Chơi Đã Lưu</h2>
      <div class="games-list">${gamesHTML}</div>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="screen">
      <button class="btn-back" data-action="menu">← Quay lại</button>
      <h2>⚙️ Cài Đặt</h2>
      
      <div class="settings-group">
        <h3>Giao diện</h3>
        <button class="btn btn-secondary" data-action="toggle-theme">
          ${state.theme === 'dark' ? '☀️ Chế độ sáng' : '🌙 Chế độ tối'}
        </button>
      </div>
      
      <div class="settings-group">
        <h3>API Configuration</h3>
        <div class="form-group">
          <label>OpenAI API Key:</label>
          <input type="password" id="api-key" class="input" placeholder="sk-..." value="${state.apiKey}">
          <button class="btn btn-small" data-action="save-api-key" style="margin-top: 10px;">Lưu</button>
        </div>
      </div>
    </div>
  `;
}

function renderGame() {
  if (!state.currentGame) return '';
  
  return `
    <div class="screen">
      <button class="btn-back" data-action="menu">← Quay lại</button>
      <h2>🎮 ${state.currentGame.title}</h2>
      <p>${state.currentGame.description}</p>
      
      <div class="game-content">
        <p>Màn hình game đang được phát triển...</p>
        <p>Tích hợp AI để tạo câu chuyện tương tác</p>
      </div>
    </div>
  `;
}

// Event Handlers
function attachEventListeners() {
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });
}

async function handleAction(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  
  switch (action) {
    case 'menu':
    case 'newgame':
    case 'savedgames':
    case 'settings':
      state.screen = action;
      render();
      break;
      
    case 'create-game':
      const title = document.getElementById('game-title').value;
      const description = document.getElementById('game-description').value;
      
      if (!title.trim()) {
        alert('Vui lòng nhập tên trò chơi');
        return;
      }
      
      const gameId = await storage.saveGame({ title, description, content: '' });
      const newGame = { id: gameId, title, description, content: '' };
      state.games.push(newGame);
      state.currentGame = newGame;
      state.screen = 'game';
      render();
      break;
      
    case 'play-game':
      state.currentGame = state.games.find(g => g.id == id);
      state.screen = 'game';
      render();
      break;
      
    case 'delete-game':
      if (confirm('Xóa trò chơi này?')) {
        await storage.deleteGame(parseInt(id));
        state.games = state.games.filter(g => g.id != id);
        render();
      }
      break;
      
    case 'toggle-theme':
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.body.className = state.theme;
      await storage.saveSetting('theme', state.theme);
      render();
      break;
      
    case 'save-api-key':
      state.apiKey = document.getElementById('api-key').value;
      await storage.saveSetting('apiKey', state.apiKey);
      alert('Đã lưu API Key!');
      break;
  }
}

// Initialize App
async function initApp() {
  try {
    await storage.init();
    state.games = await storage.getAllGames();
    state.theme = await storage.getSetting('theme', 'dark');
    state.apiKey = await storage.getSetting('apiKey', '');
    document.body.className = state.theme;
    render();
  } catch (error) {
    console.error('Failed to init app:', error);
    document.getElementById('root').innerHTML = `
      <div class="screen">
        <h2 style="color: #f44336;">Lỗi khởi động</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Start
initApp();
