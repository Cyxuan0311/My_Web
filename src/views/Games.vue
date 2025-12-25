<template>
  <div class="tui-games-page">
    <div class="tui-games-content">
      <!-- 游戏选择界面 -->
      <div v-if="!currentGame" class="tui-games-selection">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">GAMES</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-games-grid">
          <div
            v-for="game in games"
            :key="game.id"
            class="tui-game-card"
            @click="startGame(game.id)"
          >
            <div class="tui-game-icon">{{ game.icon }}</div>
            <div class="tui-game-name">{{ game.name }}</div>
            <div class="tui-game-desc">{{ game.description }}</div>
            <div class="tui-game-footer">
              <span class="tui-prompt">→</span>
              <span>开始游戏</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏界面 -->
      <div v-else class="tui-game-container">
        <!-- 跑酷游戏 -->
        <ParkourGame v-if="currentGame === 'parkour'" @back="backToSelection" />
        
        <!-- 马里奥游戏 -->
        <MarioGame v-if="currentGame === 'mario'" @back="backToSelection" />
        
        <!-- 贪吃蛇游戏 -->
        <SnakeGame v-if="currentGame === 'snake'" @back="backToSelection" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ParkourGame from '../components/games/ParkourGame.vue'
import MarioGame from '../components/games/MarioGame.vue'
import SnakeGame from '../components/games/SnakeGame.vue'

export default {
  name: 'Games',
  components: {
    ParkourGame,
    MarioGame,
    SnakeGame
  },
  setup() {
    const currentGame = ref(null)
    
    const games = [
      {
        id: 'parkour',
        name: '跑酷游戏',
        icon: '🏃',
        description: '跳跃躲避障碍物'
      },
      {
        id: 'mario',
        name: '超级马里奥',
        icon: '🍄',
        description: '经典的平台跳跃游戏'
      },
      {
        id: 'snake',
        name: '贪吃蛇',
        icon: '🐍',
        description: '经典的贪吃蛇游戏'
      }
    ]
    
    const startGame = (gameId) => {
      currentGame.value = gameId
    }
    
    const backToSelection = () => {
      currentGame.value = null
    }
    
    return {
      currentGame,
      games,
      startGame,
      backToSelection
    }
  }
}
</script>

<style scoped>
.tui-games-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  color: #c9d1d9;
  min-height: calc(100vh - 200px);
}

.tui-games-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tui-section-header {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #30363d;
}

.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-section-title {
  color: #58a6ff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #58a6ff 0%, #79c0ff 50%, #58a6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: title-shimmer 3s ease-in-out infinite;
}

@keyframes title-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.tui-games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.tui-game-card {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.tui-game-card:hover {
  border-color: #58a6ff;
  background: #161b22;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-4px);
}

.tui-game-icon {
  font-size: 4rem;
  line-height: 1;
}

.tui-game-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #58a6ff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tui-game-desc {
  font-size: 0.9rem;
  color: #8b949e;
  line-height: 1.6;
}

.tui-game-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #30363d;
  color: #58a6ff;
  font-weight: 500;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
}

.tui-game-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

@media (max-width: 768px) {
  .tui-games-page {
    padding: 1rem;
  }
  
  .tui-games-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .tui-game-card {
    padding: 1.5rem;
  }
}
</style>
