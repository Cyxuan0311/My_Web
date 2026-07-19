# ELog — Cross-Language Logging Library

> A logging library supporting C, C++, Go, and Python.

## Overview

ELog provides a unified logging interface across multiple programming languages. Whether you're writing C for embedded systems, C++ for high-performance applications, Go for microservices, or Python for data pipelines, ELog offers a consistent API for structured logging.

## Key Features

- **Multi-Language** — Native APIs for C, C++, Go, and Python
- **Log Levels** — DEBUG, INFO, WARN, ERROR, FATAL with configurable output filtering
- **File Rotation** — Automatic log file rotation based on size and time
- **Structured Logging** — JSON-formatted output for integration with log aggregation tools
- **Performance** — Low-latency, lock-free design for high-throughput applications
- **Thread Safety** — Safe for concurrent use across multiple threads

## Technical Highlights

- C core library with language bindings via FFI (Python ctypes, Go cgo)
- Lock-free ring buffer for zero-allocation logging hot path
- Configurable sinks: file, stdout, syslog, network
- Compile-time log level stripping in C/C++ for zero-overhead debug logging in production

## Links

- [GitHub Repository](https://github.com/Cyxuan0311/ELog)
