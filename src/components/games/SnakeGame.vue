<template>
  <div class="snake-game">
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
      <div class="game-container" ref="gameContainer">
        <canvas ref="gameCanvas" width="600" height="400"></canvas>
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
      <p>使用方向键或 WASD 控制蛇的移动，吃到食物会变长！</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SnakeGame',
  emits: ['back'],
  setup() {
    const gameCanvas = ref(null)
    const gameContainer = ref(null)
    const score = ref(0)
    const highScore = ref(0)
    const gameOver = ref(false)
    const gameLoop = ref(null)
    
    const GRID_SIZE = 20
    const CANVAS_WIDTH = 600
    const CANVAS_HEIGHT = 400
    const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE
    const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE
    
    let snake = [{ x: 10, y: 10 }]
    let direction = { x: 1, y: 0 }
    let nextDirection = { x: 1, y: 0 }
    let food = { x: 15, y: 15 }
    let ctx = null
    
    const loadHighScore = () => {
      const saved = localStorage.getItem('snake_high_score')
      if (saved) {
        highScore.value = parseInt(saved)
      }
    }
    
    const saveHighScore = () => {
      if (score.value > highScore.value) {
        highScore.value = score.value
        localStorage.setItem('snake_high_score', score.value.toString())
      }
    }
    
    const generateFood = () => {
      food = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      }
      // 确保食物不在蛇身上
      for (const segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
          generateFood()
          return
        }
      }
    }
    
    const draw = () => {
      if (!ctx) return
      
      // 清空画布
      ctx.fillStyle = '#0d1117'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      // 绘制网格
      ctx.strokeStyle = '#21262d'
      ctx.lineWidth = 1
      for (let i = 0; i <= GRID_WIDTH; i++) {
        ctx.beginPath()
        ctx.moveTo(i * GRID_SIZE, 0)
        ctx.lineTo(i * GRID_SIZE, CANVAS_HEIGHT)
        ctx.stroke()
      }
      for (let i = 0; i <= GRID_HEIGHT; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * GRID_SIZE)
        ctx.lineTo(CANVAS_WIDTH, i * GRID_SIZE)
        ctx.stroke()
      }
      
      // 绘制蛇
      ctx.fillStyle = '#58a6ff'
      snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#79c0ff'
        } else {
          ctx.fillStyle = '#58a6ff'
        }
        ctx.fillRect(
          segment.x * GRID_SIZE + 1,
          segment.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        )
      })
      
      // 绘制食物
      ctx.fillStyle = '#f85149'
      ctx.fillRect(
        food.x * GRID_SIZE + 2,
        food.y * GRID_SIZE + 2,
        GRID_SIZE - 4,
        GRID_SIZE - 4
      )
    }
    
    const update = () => {
      if (gameOver.value) return
      
      // 更新方向
      direction = { ...nextDirection }
      
      // 移动蛇头
      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      }
      
      // 检查边界
      if (
        head.x < 0 ||
        head.x >= GRID_WIDTH ||
        head.y < 0 ||
        head.y >= GRID_HEIGHT
      ) {
        gameOver.value = true
        saveHighScore()
        return
      }
      
      // 检查自身碰撞
      for (const segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
          gameOver.value = true
          saveHighScore()
          return
        }
      }
      
      snake.unshift(head)
      
      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        score.value += 10
        generateFood()
      } else {
        snake.pop()
      }
      
      draw()
    }
    
    const changeDirection = (newDirection) => {
      // 防止反向移动
      if (
        (direction.x === 1 && newDirection.x === -1) ||
        (direction.x === -1 && newDirection.x === 1) ||
        (direction.y === 1 && newDirection.y === -1) ||
        (direction.y === -1 && newDirection.y === 1)
      ) {
        return
      }
      nextDirection = newDirection
    }
    
    const restart = () => {
      snake = [{ x: 10, y: 10 }]
      direction = { x: 1, y: 0 }
      nextDirection = { x: 1, y: 0 }
      score.value = 0
      gameOver.value = false
      generateFood()
      draw()
    }
    
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          e.preventDefault()
          changeDirection({ x: 0, y: -1 })
          break
        case 'arrowdown':
        case 's':
          e.preventDefault()
          changeDirection({ x: 0, y: 1 })
          break
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          changeDirection({ x: -1, y: 0 })
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          changeDirection({ x: 1, y: 0 })
          break
      }
    }
    
    onMounted(() => {
      loadHighScore()
      ctx = gameCanvas.value.getContext('2d')
      generateFood()
      draw()
      gameLoop.value = setInterval(update, 150)
      window.addEventListener('keydown', handleKeyDown)
    })
    
    onUnmounted(() => {
      if (gameLoop.value) {
        clearInterval(gameLoop.value)
      }
      window.removeEventListener('keydown', handleKeyDown)
    })
    
    return {
      gameCanvas,
      gameContainer,
      score,
      highScore,
      gameOver,
      restart
    }
  }
}
</script>

<style scoped>
.snake-game {
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
  display: flex;
  justify-content: center;
}

.game-container {
  position: relative;
  display: inline-block;
  padding: 1rem;
  background: #0d1117;
  border: 2px solid #30363d;
  border-radius: 8px;
}

.game-container canvas {
  border: 1px solid #30363d;
  border-radius: 4px;
  background: #0d1117;
  display: block;
}

.game-over {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  background: rgba(13, 17, 23, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 4px;
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
