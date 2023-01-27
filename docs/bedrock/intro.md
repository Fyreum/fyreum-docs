---
title: Introduction
sidebar_position: 1
---

# Bedrock

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/158b774a4d4b4a7a9368af58f96d5dd9)](https://app.codacy.com/gh/DRE2N/Bedrock?utm_source=github.com&utm_medium=referral&utm_content=DRE2N/Bedrock&utm_campaign=Badge_Grade_Settings)

Core library for Bukkit plugins of DRE2N, containing commands, configurations, user caching and more.

## Features

- A simple command system with TabCompletion, Subcommands, command requirements and permission support.

- A FileConfiguration class loader for easy config access and management.

- An advanced FileConfiguration class loader used via annotations and wrapper classes.

- An easy way to load multiple language files and its messages. Messages might contain placeholders,
  which will be replaced with provided arguments (if given) on access.

- The MessageUtil class offers adventure's [MiniMessage](https://github.com/KyoriPowered/adventure) support,
  message centering and other helpful message utilities.

- A JavaPlugin extension class to manage plugin configs, version control, language files, permission/economy
  provider and plugin updater.

- Simple and RAM efficient User caching with basic User interface class to override, providing onJoin and
  onQuit methods.

- A bunch of other utility classes and methods to simplify the development process.

## Compatibility

This library supports paper version 1.18.2 and higher. Non-paper versions do build but lack some features,
mostly related to adventure's MiniMessage.

## DRECommons

This library is an updated paper-only version of [DRECommons](https://github.com/DRE2N/DRECommons).

## Building

### Maven

```xml
<!-- Relocate Bedrock in the maven-shade-plugin configuration -->
<artifactSet>
    <includes>
        <include>de.erethon:bedrock</include>
    </includes>
</artifactSet>
<relocations>
    <relocation>
        <pattern>de.erethon.bedrock</pattern>
        <shadedPattern>de.erethon.example.bedrock</shadedPattern>
    </relocation>
</relocations>

<!-- Add Erethon repository -->
<repositories>
    <repository>
        <id>erethon-repo</id>
        <url>https://erethon.de/repo/</url>
    </repository>
</repositories>

<!-- Add Bedrock dependency -->
<dependencies>
    <dependency>
        <groupId>de.erethon</groupId>
        <artifactId>bedrock</artifactId>
        <version>1.2.5</version>
        <scope>compile</scope>
    </dependency>
</dependencies>
```

### Gradle (Kotlin)

Building with Gradle requires the [Gradle Shadow](https://github.com/johnrengelman/shadow) plugin.

```kotlin
// Add the Gradle Shadow plugin
plugins {
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

// Add Erethon repository
repositories {
    maven {
        url = uri("https://erethon.de/repo/")
    }
}

// Add Bedrock dependency
dependencies {
    implementation("de.erethon:bedrock:1.2.5")
}

// Relocate Bedrock inside shadowJar task
shadowJar {
    dependencies {
        include(dependency("de.erethon:bedrock:1.2.5"))
    }
    relocate("de.erethon.bedrock", "de.erethon.example.bedrock")
}
```