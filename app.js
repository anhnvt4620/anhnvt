// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// TODO: Replace with your Firebase config
// Lấy config từ: https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "AIzaSyClE1q1FgNT3odRMvKlWS1Z5Tt14rjWCdA",
    authDomain: "anhnvt-62f3d.firebaseapp.com",
    projectId: "anhnvt-62f3d",
    storageBucket: "anhnvt-62f3d.firebasestorage.app",
    messagingSenderId: "438151566144",
    appId: "1:438151566144:web:0cb8c70efcfdf5f3e4e0a5",
    measurementId: "G-Z20TXPFB2W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Storage Manager với Firebase
class CloudStorageManager {
  constructor(userId) {
    this.userId = userId;
    this.gamesCollection = 'games';
    this.settingsCollection = 'settings';
  }

  // Game Operations
  async saveGame(gameData) {
    try {
      const docRef = await addDoc(collection(db, this.gamesCollection), {
        ...gameData,
        userId: this.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving game:', error);
      return { success: false, error: error.message };
    }
  }

  async updateGame(gameId, updates) {
    try {
      const gameRef = doc(db, this.gamesCollection, gameId);
      await updateDoc(gameRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating game:', error);
      return { success: false, error: error.message };
    }
  }

  async loadGame(gameId) {
    try {
      const gameRef = doc(db, this.gamesCollection, gameId);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        return { success: true, data: { id: gameSnap.id, ...gameSnap.data() } };
      }
      return { success: false, error: 'Game not found' };
    } catch (error) {
      console.error('Error loading game:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllGames() {
    try {
      const q = query(
        collection(db, this.gamesCollection),
        where('userId', '==', this.userId),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const games = [];
      querySnapshot.forEach((doc) => {
        games.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, games };
    } catch (error) {
      console.error('Error getting games:', error);
      return { success: false, error: error.message, games: [] };
    }
  }

  async deleteGame(gameId) {
    try {
      await deleteDoc(doc(db, this.gamesCollection, gameId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting game:', error);
      return { success: false, error: error.message };
    }
  }

  // Settings Operations
  async saveSetting(key, value) {
    try {
      const settingsRef = doc(db, this.settingsCollection, `${this.userId}_${key}`);
      await setDoc(settingsRef, { userId: this.userId, key, value, updatedAt: new Date().toISOString() });
      return { success: true };
    } catch (error) {
      console.error('Error saving setting:', error);
      return { success: false, error: error.message };
    }
  }

  async getSetting(key, defaultValue = null) {
    try {
      const settingRef = doc(db, this.settingsCollection, `${this.userId}_${key}`);
      const settingSnap = await getDoc(settingRef);
      if (settingSnap.exists()) {
        return settingSnap.data().value;
      }
      return defaultValue;
    } catch (error) {
      console.error('Error getting setting:', error);
      return defaultValue;
    }
  }
}

// Auth State Management
let currentUser = null;
let storageManager = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    storageManager = new CloudStorageManager(user.uid);
    console.log('✅ Logged in:', user.email);
    showApp();
  } else {
    storageManager = null;
    console.log('❌ Logged out');
    showLogin();
  }
});

// Login/Logout Functions
async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Login successful:', result.user.email);
  } catch (error) {
    console.error('Login error:', error);
    alert('Đăng nhập thất bại: ' + error.message);
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// UI Management
function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app-content').style.display = 'none';
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-content').style.display = 'block';
  loadUserData();
}

async function loadUserData() {
  if (!storageManager) return;
  
  const result = await storageManager.getAllGames();
  if (result.success) {
    renderGames(result.games);
  }
}

function renderGames(games) {
  const container = document.getElementById('games-list');
  container.innerHTML = games.map(game => `
    <div class="game-card" data-id="${game.id}">
      <h3>${game.title || 'Untitled Game'}</h3>
      <p>${game.description || ''}</p>
      <small>Updated: ${new Date(game.updatedAt).toLocaleString()}</small>
    </div>
  `).join('');
}

// Export functions
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
window.storageManager = () => storageManager;
