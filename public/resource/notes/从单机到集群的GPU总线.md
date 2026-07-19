GPU与CPU之间的互联方式，在**单机**和**集群**环境下有本质不同，这主要由通信距离、带宽和延迟需求决定。

简单来说，**单机内追求极致速度，使用短距专属总线；集群间追求大规模扩展，使用高速网络。**

### 🖥️ 单机环境：内部高速互连

在一台服务器内部，GPU与CPU（以及GPU之间）的通信，追求的是**极致带宽和极低延迟**。主要有以下几种方式：

| 互联方式 | 核心特点 | 典型带宽 | 主要应用 |
| :--- | :--- | :--- | :--- |
| **PCIe** | **通用标准**，树形拓扑，通用性强，CPU是数据流转中心。 | PCIe 4.0 x16: **64GB/s**<br>PCIe 5.0 x16: **128GB/s** | 通用计算，CPU与GPU间的数据搬运、控制命令传输。 |
| **NVLink** | **NVIDIA私有高速互联**，点对点直连，绕过CPU，专为AI/HPC设计。 | NVLink 4.0: **900GB/s**<br>NVLink 5.0: **1800GB/s** | 多GPU协同训练，GPU间高速数据交换。 |
| **NVLink-C2C** | **芯片级**互连，将CPU和GPU物理集成，实现**统一内存**访问。 | **900GB/s** (双向) | 超异构计算，如NVIDIA Grace Hopper超级芯片。 |

*   **PCIe (Peripheral Component Interconnect Express)**：作为最通用的标准，它是单机内GPU与CPU通信的**基础**和“必由之路”。所有数据进出GPU通常都需要经过PCIe总线。
*   **NVLink (NVIDIA's High-Speed Interconnect)**：为了打破PCIe的带宽瓶颈，NVIDIA推出了专属的NVLink技术。它能在GPU之间或GPU与特定CPU（如IBM POWER、NVIDIA Grace）之间建立**高带宽、低延迟**的直接通道。
*   **NVLink-C2C (Chip-2-Chip)**：这是NVLink的更进一步，实现了**芯片级**的物理互连，将CPU和GPU封装在一起，提供极高的带宽和统一的内存空间。

### ☁️ 集群环境：跨机高速网络

当计算任务扩展到多台服务器（集群）时，GPU间的通信就必须依赖**高速网络**。此时，网络性能直接决定了整个集群的计算效率。

| 互联方式 | 核心特点 | 典型带宽/延迟 | 主要应用 |
| :--- | :--- | :--- | :--- |
| **InfiniBand (IB)** | **高性能计算专用网络**，原生支持RDMA，提供无损、极低延迟的传输。 | 200Gbps/400Gbps<br>延迟 < **100ns** | 顶级AI训练、高性能计算（HPC）集群。 |
| **RoCE (RDMA over Converged Ethernet)** | **基于以太网的RDMA**技术，利用现有以太网设施获得接近IB的性能。 | 25Gbps/100Gbps/400Gbps | 追求高性能与成本平衡的AI及数据中心集群。 |
| **NVLink Switch (NVSwitch)** | **将NVLink扩展到集群级别**，通过专用交换机连接大量GPU，形成一个巨大的GPU池。 | 单交换机 **12.8Tbps** 交换容量 | 构建超大规模、性能极致的“超级GPU”节点，如NVIDIA NVL72。 |

*   **InfiniBand (IB)**：这是集群互联的“王者”，专为高性能计算设计。其核心优势是**RDMA（远程直接内存访问）** 技术，允许数据绕过CPU和操作系统，直接在GPU内存间传输。
*   **RoCE (RDMA over Converged Ethernet)**：可以看作是“亲民版”的InfiniBand。它在标准以太网上实现了RDMA功能，能在性能与成本间取得良好平衡，是许多数据中心的选择。
*   **NVLink Switch (NVSwitch)**：这是将NVLink的优势从单机扩展到集群的革命性技术。它通过专用的NVSwitch芯片，将数十甚至上百个GPU用NVLink高速互联起来，形成一个超大规模的GPU池。

### 💎 总结
从单机到集群，GPU互联是一个从**“内部总线”** 到**“外部网络”** 的演进：
*   **单机内部**，以**PCIe**为基础，以**NVLink**为性能加速器。
*   **集群之间**，以**InfiniBand**为性能标杆，以**RoCE**为性价比之选，而以**NVSwitch**为构建超大规模AI算力的终极手段。