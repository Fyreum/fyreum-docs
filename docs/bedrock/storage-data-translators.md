---
title: StorageDataTranslators
sidebar_position: 4
---

All data types you want to use, require a registered implementation of the 
[StorageDataTranslator](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataTranslator.java) class,
for the matching class type. The [StorageDataTranslators](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataTranslators.java) 
class out of the box already has a variety of translators registered to it. 

## Default translators

- `Boolean` (java.lang.Boolean)
- `Double` (java.lang.Double)
- `Integer` (java.lang.Integer)
- `Long` (java.lang.Long)
- `Object` (java.lang.Object)
- `Short` (java.lang.Short)
- `String` (java.lang.String)
- `StringIgnoreCase` (de.erethon.bedrock.misc.StringIgnoreCase)
- `Location` (org.bukkit.Location)
- `UUID` (java.util.UUID)
- `Collection` (java.util.Collection)
- `Map` (java.util.Map)

**See a more detailed list [here](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataTranslators.java).**

## Registering custom translators

Let's start by creating a custom data class, containing 3 different values.

```java
public class CustomData {
    
    /* some values */
    private final String string;
    private final int integer;
    private final boolean aBoolean;
    
    /* simple constructor*/
    public CustomData(String string, int integer, boolean aBoolean) {
        this.string = string;
        this.integer = integer;
        this.aBoolean = aBoolean;
    }
    
    /* getter */
    
    public String getString() {
        return string;
    }
    
    public int getInteger() {
        return integer;
    }
    
    public boolean getBoolean() {
        return aBoolean;
    }
}
```

Registering a matching translator would look like:

```java
StorageDataTranslators.registerDataTranslator(new StorageDataTranslator<>(CustomData.class, o -> {
    CustomData data = (CustomData) o;
    Map<String, Object> serialized = new HashMap<>(3); // Size of 3, because there are 3 values.
    serialized.put("string", data.getString());
    serialized.put("integer", data.getInteger());
    serialized.put("aBoolean", data.getABoolean());
    return serialized; // Return the serialized map.
}, o -> {
    ConfigurationSection section = (ConfigurationSection) o; // Maps are loaded as ConfigurationSections.
    String string = section.getString("string");
    int integer = section.getInt("integer");
    boolean aBoolean = section.getBoolean("aBoolean");
    return new CustomData(string, integer, aBoolean); // Return the deserialized value.
}));
```

:::note

There are many ways to serialize and deserialize values. This is just a basic example of how it could look like.

:::

### Error handling for deserialization

Errors thrown while deserializing values will we sent into the console. Values which deserialization failed,
will be treated as null values and will be therefore handled by the set [nullability behaviour](/bedrock/storage-data-container#nullability).

## Override default translators

To override a default translator, just register a data translator for the same class type.
This can be done via the same method as registering a new translator.

Example:

```java
StorageDataTranslators.registerDataTranslator(
        new StorageDataTranslator<>(Integer.class, o -> o, o -> o instanceof Integer ? (int) o : -1)
);
```

This would set the default value of non-integers to `-1`, and load integers normally.
