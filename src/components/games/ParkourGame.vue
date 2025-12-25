<template>
  <div class="parkour-game">
    <div class="game-header">
      <button class="back-btn" @click="$emit('back')">
        <span class="tui-prompt">←</span>
        <span>返回</span>
      </button>
      <div class="game-info">
        <div class="score">分数: {{ score }}</div>
        <div class="high-score">最高分: {{ highScore }}</div>
      </div>
    </div>
    
    <div class="game-wrapper">
      <div class="game-container" ref="gameContainer" @click="jump">
        <div class="game-ground"></div>
        <div 
          class="player" 
          :class="{ jumping: isJumping }"
          :style="{ bottom: playerY + 'px' }"
        >🏃</div>
        <div
          v-for="(obstacle, index) in obstacles"
          :key="index"
          class="obstacle"
          :style="{ right: obstacle.x + 'px' }"
        >🪨</div>
        <div v-if="gameOver" class="game-over">
          <div class="game-over-content">
            <h2>游戏结束!</h2>
            <p>最终分数: {{ score }}</p>
            <button @click="restart" class="restart-btn">重新开始</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="game-instructions">
      <p>点击屏幕或按空格键跳跃，躲避障碍物！</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ParkourGame',
  emits: ['back'],
  setup() {
    const gameContainer = ref(null)
    const playerY = ref(0)
    const isJumping = ref(false)
    const obstacles = ref([])
    const score = ref(0)
    const highScore = ref(0)
    const gameOver = ref(false)
    const gameSpeed = ref(5)
    const gameLoop = ref(null)
    
    const JUMP_HEIGHT = 150
    const GRAVITY = 8
    const OBSTACLE_SPEED = 5
    const OBSTACLE_SPAWN_RATE = 120
    
    let velocity = 0
    let frameCount = 0
    
    // 加载最高分
    const loadHighScore = () => {
      const saved = localStorage.getItem('parkour_high_score')
      if (saved) {
        highScore.value = parseInt(saved)
      }
    }
    
    // 保存最高分
    const saveHighScore = () => {
      if (score.value > highScore.value) {
        highScore.value = score.value
        localStorage.setItem('parkour_high_score', score.value.toString())
      }
    }
    
    const jump = () => {
      if (!isJumping.value && !gameOver.value) {
        isJumping.value = true
        velocity = -JUMP_HEIGHT / 10
      }
    }
    
    const spawnObstacle = () => {
      obstacles.value.push({
        x: 0,
        id: Date.now()
      })
    }
    
    const checkCollision = () => {
      const playerRect = {
        left: 100,
        right: 150,
        top: playerY.value,
        bottom: playerY.value + 50
      }
      
      for (const obstacle of obstacles.value) {
        const obstacleRect = {
          left: gameContainer.value.clientWidth - obstacle.x - 50,
          right: gameContainer.value.clientWidth - obstacle.x,
          top: gameContainer.value.clientHeight - 100,
          bottom: gameContainer.value.clientHeight - 50
        }
        
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true
        }
      }
      return false
    }
    
    const update = () => {
      if (gameOver.value) return
      
      frameCount++
      
      // 更新玩家位置
      if (isJumping.value) {
        playerY.value += velocity
        velocity += GRAVITY
        
        if (playerY.value >= 0) {
          playerY.value = 0
          velocity = 0
          isJumping.value = false
        }
      }
      
      // 生成障碍物
      if (frameCount % OBSTACLE_SPAWN_RATE === 0) {
        spawnObstacle()
      }
      
      // 更新障碍物位置
      obstacles.value = obstacles.value.map(obstacle => ({
        ...obstacle,
        x: obstacle.x + OBSTACLE_SPEED + gameSpeed.value
      })).filter(obstacle => obstacle.x < gameContainer.value.clientWidth + 100)
      
      // 检查碰撞
      if (checkCollision()) {
        gameOver.value = true
        saveHighScore()
        return
      }
      
      // 更新分数
      score.value = Math.floor(frameCount / 10)
      
      // 增加游戏速度
      if (frameCount % 500 === 0) {
        gameSpeed.value += 0.5
      }
    }
    
    const restart = () => {
      playerY.value = 0
      isJumping.value = false
      obstacles.value = []
      score.value = 0
      gameOver.value = false
      gameSpeed.value = 5
      frameCount = 0
      velocity = 0
    }
    
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
      }
    }
    
    onMounted(() => {
      loadHighScore()
      gameLoop.value = setInterval(update, 16)
      window.addEventListener('keydown', handleKeyPress)
    })
    
    onUnmounted(() => {
      if (gameLoop.value) {
        clearInterval(gameLoop.value)
      }
      window.removeEventListener('keydown', handleKeyPress)
    })
    
    return {
      gameContainer,
      playerY,
      isJumping,
      obstacles,
      score,
      highScore,
      gameOver,
      jump,
      restart
    }
  }
}
</script>

<style scoped>
.parkour-game {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #58a6ff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.back-btn:hover {
  border-color: #58a6ff;
  background: #21262d;
}

.game-info {
  display: flex;
  gap: 2rem;
  color: #c9d1d9;
  font-size: 0.9rem;
}

.score, .high-score {
  color: #58a6ff;
  font-weight: 600;
}

.game-wrapper {
  position: relative;
  width: 100%;
}

.game-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 100%);
  border: 2px solid #30363d;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.game-ground {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, #8B7355 0%, #6B5B4A 100%);
  border-top: 2px solid #5A4A3A;
}

.player {
  position: absolute;
  left: 100px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  font-size: 2.5rem;
  transition: transform 0.1s ease;
  z-index: 10;
}

.player.jumping {
  transform: scale(1.1);
}

.obstacle {
  position: absolute;
  bottom: 100px;
  width: 50px;
  height: 50px;
  font-size: 2.5rem;
  z-index: 5;
}

.game-over {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 17, 23, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 8px;
}

.game-over-content {
  text-align: center;
  color: #c9d1d9;
  padding: 2rem;
  background: #161b22;
  border: 2px solid #58a6ff;
  border-radius: 12px;
}

.game-over-content h2 {
  color: #58a6ff;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.game-over-content p {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.restart-btn {
  padding: 0.75rem 2rem;
  background: #0d1117;
  border: 1px solid #58a6ff;
  border-radius: 6px;
  color: #58a6ff;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.restart-btn:hover {
  background: #161b22;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
}

.game-instructions {
  margin-top: 1rem;
  text-align: center;
  color: #8b949e;
  font-size: 0.9rem;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
}
</style>
