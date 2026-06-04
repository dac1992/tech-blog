---
title: Java 并发编程
description: 线程、锁、并发工具与 Java 21 虚拟线程。
---

## 线程基础

```java
// 方式一：继承 Thread
Thread t = new Thread(() -> System.out.println("Hello from thread"));
t.start();

// 方式二：ExecutorService
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Task 1"));
executor.submit(() -> System.out.println("Task 2"));
executor.shutdown();
```

## synchronized 与锁

```java
// 同步方法
public synchronized void increment() {
    count++;
}

// 同步代码块
synchronized (lock) {
    // 临界区
}

// ReentrantLock（更灵活）
private final ReentrantLock lock = new ReentrantLock();

public void transfer() {
    lock.lock();
    try {
        // 业务逻辑
    } finally {
        lock.unlock();
    }
}
```

## 并发集合

| 集合 | 特点 |
|------|------|
| `ConcurrentHashMap` | 高并发哈希表，分段锁 |
| `CopyOnWriteArrayList` | 读无锁，写时复制 |
| `BlockingQueue` | 生产者-消费者模式 |
| `ConcurrentLinkedQueue` | 无锁并发队列 |

```java
BlockingQueue<String> queue = new ArrayBlockingQueue<>(10);

// 生产者
queue.put("item");

// 消费者
String item = queue.take();
```

## CompletableFuture

Java 8 引入的异步编程工具：

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> processData(data))
    .thenApply(result -> formatResult(result))
    .exceptionally(ex -> "Error: " + ex.getMessage());

String result = future.get();
```

## 虚拟线程（Java 21）

轻量级线程，百万级并发不再是梦想：

```java
// 创建虚拟线程
Thread.ofVirtual().start(() -> {
    System.out.println("Virtual thread: " + Thread.currentThread());
});

// 虚拟线程 ExecutorService
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
} // 10 万个任务，每个睡 1 秒，约 1 秒全部完成
```

:::caution[注意事项]
虚拟线程适合 **IO 密集型** 任务（网络请求、数据库查询），CPU 密集型任务仍应使用平台线程。
:::
