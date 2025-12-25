<template>
  <div class="mario-game">
    <div class="game-header">
      <button class="back-btn" @click="$emit('back')">
        <span class="tui-prompt">←</span>
        <span>返回</span>
      </button>
      <div class="game-info">
        <div class="score">分数: {{ score }}</div>
        <div class="lives">生命: {{ lives }}</div>
        <div class="high-score">最高分: {{ highScore }}</div>
      </div>
    </div>
    
    <div class="game-wrapper">
      <div class="game-container" ref="gameContainer">
        <div class="game-ground"></div>
        <div 
          class="player" 
          :class="{ jumping: isJumping, running: !isJumping }"
          :style="{ left: playerX + 'px', bottom: playerY + 'px' }"
        >🍄</div>
        <div
          v-for="(platform, index) in platforms"
          :key="index"
          class="platform"
          :style="{ left: platform.x + 'px', bottom: platform.y + 'px', width: platform.width + 'px' }"
        ></div>
        <div
          v-for="(coin, index) in coins"
          :key="index"
          class="coin"
          :style="{ left: coin.x + 'px', bottom: coin.y + 'px' }"
        >🪙</div>
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
      <p>使用 A/D 或 ←/→ 移动，空格键跳跃，收集金币！</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'MarioGame',
  emits: ['back'],
  setup() {
    const gameContainer = ref(null)
    const playerX = ref(100)
    const playerY = ref(100)
    const isJumping = ref(false)
    const platforms = ref([])
    const coins = ref([])
    const score = ref(0)
    const lives = ref(3)
    const highScore = ref(0)
    const gameOver = ref(false)
    const gameLoop = ref(null)
    
    const GRAVITY = 0.8
    const JUMP_POWER = -15
    const MOVE_SPEED = 5
    const PLATFORM_HEIGHT = 20
    
    let velocityY = 0
    let velocityX = 0
    let keys = {}
    
    const loadHighScore = () => {
      const saved = localStorage.getItem('mario_high_score')
      if (saved) {
        highScore.value = parseInt(saved)
      }
    }
    
    const saveHighScore = () => {
      if (score.value > highScore.value) {
        highScore.value = score.value
        localStorage.setItem('mario_high_score', score.value.toString())
      }
    }
    
    const initPlatforms = () => {
      platforms.value = [
        { x: 0, y: 0, width: 200 },
        { x: 250, y: 80, width: 150 },
        { x: 450, y: 150, width: 120 },
        { x: 600, y: 100, width: 100 },
        { x: 750, y: 180, width: 150 }
      ]
    }
    
    const spawnCoin = () => {
      const platform = platforms.value[Math.floor(Math.random() * platforms.value.length)]
      coins.value.push({
        x: platform.x + Math.random() * (platform.width - 30),
        y: platform.y + PLATFORM_HEIGHT + 10,
        id: Date.now()
      })
    }
    
    const checkPlatformCollision = () => {
      for (const platform of platforms.value) {
        if (
          playerX.value + 30 > platform.x &&
          playerX.value < platform.x + platform.width &&
          playerY.value <= platform.y + PLATFORM_HEIGHT &&
          playerY.value + 30 >= platform.y &&
          velocityY >= 0
        ) {
          playerY.value = platform.y + PLATFORM_HEIGHT
          velocityY = 0
          isJumping.value = false
          return true
        }
      }
      return false
    }
    
    const checkCoinCollision = () => {
      coins.value = coins.value.filter(coin => {
        const distance = Math.sqrt(
          Math.pow(playerX.value + 15 - coin.x - 15, 2) +
          Math.pow(playerY.value + 15 - coin.y - 15, 2)
        )
        if (distance < 30) {
          score.value += 10
          return false
        }
        return true
      })
    }
    
    const checkFall = () => {
      if (playerY.value > gameContainer.value.clientHeight) {
        lives.value--
        if (lives.value <= 0) {
          gameOver.value = true
          saveHighScore()
        } else {
          playerX.value = 100
          playerY.value = 100
          velocityY = 0
          isJumping.value = false
        }
      }
    }
    
    const update = () => {
      if (gameOver.value) return
      
      // 处理输入
      velocityX = 0
      if (keys['a'] || keys['ArrowLeft']) velocityX = -MOVE_SPEED
      if (keys['d'] || keys['ArrowRight']) velocityX = MOVE_SPEED
      
      // 更新位置
      playerX.value += velocityX
      playerY.value += velocityY
      
      // 重力
      velocityY += GRAVITY
      
      // 检查平台碰撞
      checkPlatformCollision()
      
      // 检查金币碰撞
      checkCoinCollision()
      
      // 检查掉落
      checkFall()
      
      // 边界检查
      if (playerX.value < 0) playerX.value = 0
      if (playerX.value > gameContainer.value.clientWidth - 30) {
        playerX.value = gameContainer.value.clientWidth - 30
      }
      
      // 生成金币
      if (Math.random() < 0.01 && coins.value.length < 5) {
        spawnCoin()
      }
    }
    
    const jump = () => {
      if (!isJumping.value && !gameOver.value) {
        isJumping.value = true
        velocityY = JUMP_POWER
      }
    }
    
    const restart = () => {
      playerX.value = 100
      playerY.value = 100
      isJumping.value = false
      velocityY = 0
      velocityX = 0
      score.value = 0
      lives.value = 3
      gameOver.value = false
      coins.value = []
      initPlatforms()
    }
    
    const handleKeyDown = (e) => {
      keys[e.key.toLowerCase()] = true
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
      }
    }
    
    const handleKeyUp = (e) => {
      keys[e.key.toLowerCase()] = false
    }
    
    onMounted(() => {
      loadHighScore()
      initPlatforms()
      gameLoop.value = setInterval(update, 16)
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    })
    
    onUnmounted(() => {
      if (gameLoop.value) {
        clearInterval(gameLoop.value)
      }
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    })
    
    return {
      gameContainer,
      playerX,
      playerY,
      isJumping,
      platforms,
      coins,
      score,
      lives,
      highScore,
      gameOver,
      restart
    }
  }
}
</script>

<style scoped>
.mario-game {
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
  flex-wrap: wrap;
  gap: 1rem;
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
  flex-wrap: wrap;
}

.score, .lives, .high-score {
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
  width: 30px;
  height: 30px;
  font-size: 2rem;
  transition: transform 0.1s ease;
  z-index: 10;
}

.player.jumping {
  transform: scale(1.2) rotate(-10deg);
}

.platform {
  position: absolute;
  height: 20px;
  background: #8B7355;
  border: 2px solid #6B5B4A;
  border-radius: 4px;
  z-index: 5;
}

.coin {
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  animation: coin-spin 2s linear infinite;
  z-index: 8;
}

@keyframes coin-spin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
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
