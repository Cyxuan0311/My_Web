# Forge — LLM Inference Engine

> A lightweight LLM inference engine written from scratch in C++ and CUDA.

## Overview

Forge is a from-scratch implementation of a large language model inference engine. Built for learning and performance, it demonstrates the full pipeline of transformer-based text generation — from tokenization to attention mechanisms — all implemented in C++ with CUDA acceleration.

## Key Features

- **Transformer Architecture** — Full implementation of decoder-only transformer
- **CUDA Kernels** — Custom CUDA kernels for attention, feed-forward, and embedding layers
- **Quantization** — INT8 and FP16 quantization support for reduced memory usage
- **KV Cache** — Efficient key-value caching for autoregressive generation
- **Sampling** — Multiple sampling strategies: greedy, top-k, top-p, temperature
- **Minimal Dependencies** — Only CUDA and standard C++ libraries required

## Technical Highlights

- Custom implementation of multi-head attention entirely in CUDA
- Fused kernel designs for memory-bound operations
- Static memory allocation to avoid runtime CUDA malloc overhead
- Model weights loaded from Hugging Face compatible format

## Links

- [GitHub Repository](https://github.com/Cyxuan0311/Forge)
