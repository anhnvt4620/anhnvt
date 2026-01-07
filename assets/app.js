import React from 'https://esm.sh/react@19.1.1';
import ReactDOM from 'https://esm.sh/react-dom@19.1.1/client';

const { useState, useEffect } = React;

// Storage Manager (IndexedDB)
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

const storage = new StorageManager();

// Main App Component
function App() {
  const [screen, setScreen] = useState('menu');
  const [games, setGames] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [apiKey, setApiKey] = useState('');
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    storage.init().then(async () => {
      const savedGames = await storage.getAllGames();
      setGames(savedGames);
      const savedTheme = await storage.getSetting('theme', 'dark');
      setTheme(savedTheme);
      const savedKey = await storage.getSetting('apiKey', '');
      setApiKey(savedKey);
    });
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const MainMenu = () => (
    <div className="menu-screen">
      <div className="logo">🌏</div>
      <h1 className="title">Tam Thiên Thế Giới</h1>
      <p className="subtitle">Trò chơi kể chuyện tương tác với AI</p>
      
      <div className="menu-buttons">
        <button className="btn btn-primary" onClick={() => setScreen('newgame')}>
          ✨ Trò Chơi Mới
        </button>
        <button className="btn btn-secondary" onClick={() => setScreen('savedgames')}>
          💾 Trò Chơi Đã Lưu ({games.length})
        </button>
        <button className="btn btn-secondary" onClick={() => setScreen('settings')}>
          ⚙️ Cài Đặt
        </button>
      </div>
      
      <div className="footer">
        <p>v2.0 - Cloud Ready</p>
      </div>
    </div>
  );

  const NewGameScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createGame = async () => {
      if (!title.trim()) {
        alert('Vui lòng nhập tên trò chơi');
        return;
      }
      const gameId = await storage.saveGame({ title, description, content: '' });
      const newGame = { id: gameId, title, description, content: '' };
      setGames([...games, newGame]);
      setCurrentGame(newGame);
      setScreen('game');
    };

    return (
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('menu')}>← Quay lại</button>
        <h2>✨ Trò Chơi Mới</h2>
        
        <div className="form-group">
          <label>Tên trò chơi:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Hành trình tu tiên"
            className="input"
          />
        </div>
        
        <div className="form-group">
          <label>Mô tả:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả ngắn về câu chuyện..."
            className="textarea"
            rows="4"
          />
        </div>
        
        <button className="btn btn-primary" onClick={createGame}>
          Tạo Trò Chơi
        </button>
      </div>
    );
  };

  const SavedGamesScreen = () => (
    <div className="screen">
      <button className="btn-back" onClick={() => setScreen('menu')}>← Quay lại</button>
      <h2>💾 Trò Chơi Đã Lưu</h2>
      
      {games.length === 0 ? (
        <p className="empty-state">Chưa có trò chơi nào. Tạo trò chơi mới để bắt đầu!</p>
      ) : (
        <div className="games-list">
          {games.map(game => (
            <div key={game.id} className="game-card">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-actions">
                <button className="btn btn-small" onClick={() => {
                  setCurrentGame(game);
                  setScreen('game');
                }}>
                  Chơi
                </button>
                <button className="btn btn-small btn-danger" onClick={async () => {
                  if (confirm('Xóa trò chơi này?')) {
                    await storage.deleteGame(game.id);
                    setGames(games.filter(g => g.id !== game.id));
                  }
                }}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const GameScreen = () => {
    if (!currentGame) return null;
    
    return (
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('menu')}>← Quay lại</button>
        <h2>🎮 {currentGame.title}</h2>
        <p>{currentGame.description}</p>
        
        <div className="game-content">
          <p>Màn hình game sẽ được phát triển thêm...</p>
          <p>Tích hợp AI để tạo câu chuyện tương tác</p>
        </div>
      </div>
    );
  };

  const SettingsScreen = () => {
    const toggleTheme = async () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      await storage.saveSetting('theme', newTheme);
    };

    const saveApiKey = async () => {
      await storage.saveSetting('apiKey', apiKey);
      alert('Đã lưu API Key!');
    };

    return (
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('menu')}>← Quay lại</button>
        <h2>⚙️ Cài Đặt</h2>
        
        <div className="settings-group">
          <h3>Giao diện</h3>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Chế độ sáng' : '🌙 Chế độ tối'}
          </button>
        </div>
        
        <div className="settings-group">
          <h3>API Configuration</h3>
          <div className="form-group">
            <label>OpenAI API Key:</label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="input"
            />
            <button className="btn btn-small" onClick={saveApiKey}>Lưu</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {screen === 'menu' && <MainMenu />}
      {screen === 'newgame' && <NewGameScreen />}
      {screen === 'savedgames' && <SavedGamesScreen />}
      {screen === 'game' && <GameScreen />}
      {screen === 'settings' && <SettingsScreen />}
    </div>
  );
}

// Initialize app
storage.init().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
});
