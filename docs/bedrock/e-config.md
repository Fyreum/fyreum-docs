---
title: EConfig
sidebar_position: 2
---

## Features

- Simple Bukkit FileConfiguration creation and maintaining.
- File versioning, to prevent data loss.
- Backup creation in case of an erroneous config file.

## How to use

### Config setup

To make use of the config wrapper, the class containing the targeted data fields has to extend the
[StorageDataContainer](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/EConfig.java) class.
The config itself requires 2 arguments in order to work:

- `File` - Defines which file should be used to create the FileConfiguration.
- `int` - The current config version. If a loaded version is outdated, all missing values will be added.

```java
public class ExampleConfig extends EConfig {

    public static final int CONFIG_VERSION = 1;

    public ExampleConfig() {
        super(new File("path/file.yml"), CONFIG_VERSION);
    }
    
    @Override
    public void load() {
        // This method has to be implemented & should contain every class value.
    }
}
```

Replace `path` with the actual path to the file you want to use and `file` with the name of the file.