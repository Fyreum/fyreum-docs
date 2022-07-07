---
title: Storage System
sidebar_position: 2
---

## Features

- Serialization based on class types, to store data inside Bukkits FileConfiguration.
- Automatic data management, configured by declaring annotations above the desired fields.
- Reduction of unneeded explicit code.

## How to use

### StorageDataContainer

To make use of the storage system, the class containing the targeted data fields has to extend the
[StorageDataContainer](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataContainer.java) class.
The container itself requires 2 parameters: 

- A file to store the data at
- The current config version

```java
public class ExampleStorageDataContainer extends StorageDataContainer {
    
    public static final int CONFIG_VERSION = 1;
    
    public ExampleStorageDataContainer() {
        super(new File("path/file.yml"), CONFIG_VERSION);
    }
}
```

Replace ``path`` with the actual path to the file you want to use and ``file`` with the name of the file.

### Add data fields

