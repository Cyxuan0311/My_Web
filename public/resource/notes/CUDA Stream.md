CUDA Stream 是 CUDA 编程中实现任务并行和隐藏数据搬运延迟的核心机制。你可以把它理解为GPU上的一个**异步任务队列**。

### 🎯 核心概念：什么是 CUDA Stream？

CUDA Stream 本质上是一个**操作队列**，它按照**先进先出（FIFO）** 的顺序执行被放入其中的 GPU 操作。这些操作包括：

*   **核函数（Kernel）启动**
*   主机与设备间的**异步内存拷贝**（如 `cudaMemcpyAsync`）

理解 Stream 的关键在于它如何管理和调度这些操作：

1.  **异步性**：一旦将操作放入 Stream，控制权会立刻返回给主机（CPU），主机可以继续执行后续任务，无需等待 GPU 操作完成。
2.  **顺序性**：**同一个 Stream 中的操作，严格按入队顺序执行**。
3.  **并发性**：**不同 Stream 中的操作在资源允许的情况下，可以并行执行**。

### 🏛️ 在 CUDA 模型中的层次

Stream 位于 **Grid 级别**的并行。它管理的是多个核函数（Grid）以及内存拷贝之间的执行和调度。因此，Stream 是比线程块（Block）和线程（Thread）更高层次的抽象，它不关心单个核函数内部的线程如何并行，而是关注**整个任务（如多个 Kernel）如何在 GPU 上并发执行**。

### 🛠️ 如何使用：从创建到销毁

使用 CUDA Stream 的典型流程分为四步：

#### 1. 准备工作：使用固定内存（Pinned Memory）
这是实现异步传输的关键。主机端用于 `cudaMemcpyAsync` 的内存必须是**页锁定（Pinned）** 的，这样才能让 GPU 的 DMA 引擎直接访问，无需 CPU 干预。使用 `cudaMallocHost` 或 `cudaHostAlloc` 来分配。

#### 2. 创建流
使用 `cudaStreamCreate` 创建一个流。

```cpp
cudaStream_t stream;
cudaStreamCreate(&stream);
```

#### 3. 将操作放入流
在核函数的执行配置（`<<<>>>`）和异步内存拷贝函数中，将 Stream 作为最后一个参数传入。

```cpp
// 异步内存拷贝：主机 -> 设备
cudaMemcpyAsync(dst, src, size, cudaMemcpyHostToDevice, stream);

// 核函数启动
kernel<<<grid, block, shared_mem_size, stream>>>(args);

// 异步内存拷贝：设备 -> 主机
cudaMemcpyAsync(dst, src, size, cudaMemcpyDeviceToHost, stream);
```
需要注意的是，`cudaMemcpy` 是同步的，会阻塞主机线程；而 `cudaMemcpyAsync` 是异步的，需配合 Stream 使用。

#### 4. 同步与销毁
为确保所有操作完成，需要在主机端进行同步。最后销毁 Stream 释放资源。

```cpp
// 等待特定流完成
cudaStreamSynchronize(stream);

// 等待设备上所有操作完成
cudaDeviceSynchronize();

// 销毁流
cudaStreamDestroy(stream);
```

### 📚 核心 API 速览

| 功能 | Runtime API (推荐) | Driver API | 说明 |
| :--- | :--- | :--- | :--- |
| **创建流** | `cudaStreamCreate` | `cuStreamCreate` | 创建一个普通流 |
| **创建非阻塞流** | `cudaStreamCreateWithFlags` | `cuStreamCreate` | 不影响其他流，不与默认流同步 |
| **销毁流** | `cudaStreamDestroy` | `cuStreamDestroy` | 销毁流 |
| **同步流** | `cudaStreamSynchronize` | `cuStreamSynchronize` | 阻塞主机，直到流中所有操作完成 |
| **查询流状态** | `cudaStreamQuery` | `cuStreamQuery` | 检查流中的操作是否全部完成（非阻塞） |
| **添加回调** | `cudaStreamAddCallback` | `cuStreamAddCallback` | 在流中所有操作完成后，在设备上执行一个回调函数 |
| **等待事件** | `cudaStreamWaitEvent` | `cuStreamWaitEvent` | 让一个流等待一个事件完成，实现流间同步 |

### ⚠️ 特殊规则：默认流

默认流（Default Stream，也称 `NULL Stream`）是特殊的同步流，其行为因编译选项而异。

*   **传统默认流 (Legacy Default Stream)**：会阻塞其它所有用户创建的 Stream。当默认流有任务执行时，其它流必须等待；反之亦然。为获得最大并发性，建议避免使用默认流，或使用 `cudaStreamNonBlocking` 标志创建非阻塞流。
*   **每线程默认流 (Per-thread Default Stream)**：每个主机线程有自己的默认流，它不会阻塞其它 Stream。

### 🚀 典型应用场景：数据传输与计算的重叠

Stream 最经典的应用是实现**数据传输与计算的重叠（Overlap）**，以隐藏数据搬运的延迟。

**核心模式**：将数据分块（Chunk），为每个数据块创建一个 Stream。在每个 Stream 中，按“**拷贝到设备 → 执行核函数 → 拷贝回主机**”的顺序放入操作。由于不同 Stream 间的操作可以并行，GPU 可以在一个 Stream 执行计算的同时，在另一个 Stream 进行数据传输，从而充分利用 PCIe 带宽和 GPU 计算资源。

### 💎 总结

CUDA Stream 是驾驭 GPU 强大并行能力的关键工具。它通过将任务组织成可并发执行的队列，让你能精细地控制任务执行顺序和并发度，是实现高性能 GPU 计算的核心技能。

如果想了解更具体的用法，比如如何实现数据传输与计算重叠的示例代码，可以随时再问我。