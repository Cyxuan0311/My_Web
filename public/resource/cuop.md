# cuOP — CUDA Operator Library

> A CUDA-ready operator library with smart memory control and JIT compilation.

## Overview

cuOP is a high-performance operator library designed for GPU computing. It provides a collection of optimized CUDA kernels for common operations in scientific computing and machine learning, with smart memory management to minimize PCIe transfers.

## Key Features

- **Smart Memory Control** — Automatic memory pooling and reuse to reduce allocation overhead
- **JIT Compilation** — Runtime kernel compilation for target-specific optimization
- **Optimized Kernels** — Hand-tuned CUDA kernels for matrix operations, reductions, and more
- **Multi-GPU** — Transparent multi-GPU support with automatic load balancing
- **C++ API** — Modern C++ API with RAII resource management
- **Integration** — Easy integration with existing CUDA projects

## Technical Highlights

- JIT compilation using NVIDIA's NVRTC library
- Custom memory allocator with buddy allocation for GPU memory
- Kernel fusion to reduce launch overhead and memory bandwidth usage
- Compiled with `-arch=sm_70` and above for modern GPU architectures

## Links

- [GitHub Repository](https://github.com/Cyxuan0311/cuOP)
