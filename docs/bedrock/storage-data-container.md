---
title: StorageDataContainer
sidebar_position: 3
---

## Features

- Serialization based on class types, to store data inside Bukkits FileConfiguration.
- Automatic data management, configured by declaring annotations above the desired fields.
- Reduction of unneeded explicit code.

## Container setup

To make use of the storage system, the class containing the targeted data fields has to extend the
[StorageDataContainer](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataContainer.java) class.
The container itself requires 2 arguments in order to work: 

- `File` - A file to store the data at
- `int` - The current config version

**See the [Config Wrapper](/bedrock/e-config) class for more details**

```java
public class ExampleStorageDataContainer extends StorageDataContainer {
    
    public static final int CONFIG_VERSION = 1;
    
    public ExampleStorageDataContainer() {
        super(new File("path/file.yml"), CONFIG_VERSION);
    }
}
```

Replace `path` with the actual path to the file you want to use and `file` with the name of the file.

### Adding data fields

You can add a data field by simply adding the [StorageData](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageData.java) 
annotation above the desired class field.

```java
@StorageData
private String string = "This is a String";
```

The annotation without specifications is already enough to let the StorageDataContainer do its work.
But in order to achieve the desired loading, storing & saving behaviour, additional arguments are necessary.

### Adding additional containers

You can also add additional container classes, inside a container. Additional containers are not required to extend the
[StorageDataContainer](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataContainer.java) 
class, as they're managed by the original container as well. Hence, those containers offer more freedom to use.

```java
@AdditionalContainer
private YourAdditionalContainerClass additionalContainer = new YourAdditionalContainerClass();
```

:::note

Adding data fields inside an additional container works exactly the same as inside actual containers.

:::

## Data field options

### Custom path

While no explicit path is set, the field name itself will be used in order to store the field's value.
If the field is named `string`, the configuration path would also be `string`. 
So the config would look like this:

```yaml
string: "This is a String"
```

To change this, a custom path has to be specified inside the annotation's args.

Example:

```java
@StorageData(path = "customPathToString")
private String string = "This is a String";
```

Will lead to:

```yaml
customPathToString: "This is a String"
```

### Initialization

There are two different options for initialization available:

- `true (default)` - The pre-existing value will be saved inside the config, if the config doesn't contain a value at given path already.
- `false` - Nothing happens on initialization.

### Logging

This option sets the logging behaviour.

- `true` - Initializing, loading and saving the object will be logged.
- `false (default)` - Nothing will be logged.

Example:

```java
@StorageData(log = true)
```

### Debugging

This option sets the debugging behaviour.
Debug messages contain a lot more information about the value itself and each step of initializing, loading & saving process, than logging does.

- `true` - Initializing, loading and saving the object will be debugged step-by-step.
- `false (default)` - Nothing will be debugged.

Example:

```java
@StorageData(debug = true)
```

### Nullability

This option sets the behaviour for handling null values on load.

- `LOAD (default)` - Null values will be loaded and saved.
- `IGNORE` - Null values won't be loaded or saved.
- `FORBID` - Null values won't be loaded or saved and an error message will be sent.

Example:

```java
@StorageData(nullability = Nullability.FORBID)
```

Related to this option, a custom message for forbidden null values can be specified as well.

Using: 

```java
@StorageData(forbiddenNullMessage = "Custom error message here")
```

### Saving

There are three different options for saving available, whenever the container starts the saving process:

- `ALWAYS` - The data will always be saved.
- `CHANGES (default)` - The data will only be saved, if it was changed.
- `NONE` - The data won't be saved at all.

Example:

```java
@StorageData(save = StorageDataSave.ALWAYS)
```

### Key types

This option sets the class type of each key occurring inside an object's class parameters.
This is required while using a Map, as well as the `valueTypes` option.

Example:

```java
@StorageData(keyTypes = String.class)
private Map<String, Integer> stringIntegerMap = new HashMap<>();
```

:::note

In this example, other **necessary** options are not displayed. For correct usage of Maps, see **[this](#maps)**.

:::

### Value types

This option sets the class type of each value occurring inside an object's class parameters.
This is required while using a Collection or Map.

Example:

```java
@StorageData(valueTypes = Integer.class)
private List<Integer> integerList = new ArrayList<>();
```

### Override field types

When using a Collection or Map, the field type is often stated as an interface (e.g. `List`).
To create a new List, you need to use an implementation of such. So in order to use a List here,
the correct implementation type has to be defined as well. 

Example:

```java
@StorageData(type = ArrayListc.class, valueTypes = Integer.class)
private List<Integer> integerList = new ArrayList<>();
```

## Additional container options

### Custom sub-path

An additional container might have set a sub-path, which gets prepended before each path inside it.
By default, the sub-path is empty.

Path scheme for the data field: `{SUBPATH}{PATH}`

Example:

```java
@AdditionalContainer(subPath="additional.")
private YourAdditionalContainerClass additionalContainer = new YourAdditionalContainerClass();
```

Inside the additional container:

```java
@StorageData(path="customPathToString")
private String string = "A String";
```

Path of the String: `additional.customPathToString`


There is also a special behaviour for paths inside an additional container. When set to `#`, only the `subPath` will be used,
without adding its field name etc.

Example:

```java
@AdditionalContainer(subPath = "additionalContainer")
private YourAdditionalContainerClass additionalContainer = new YourAdditionalContainerClass();
```

Inside the additional container:

```java
@StorageData(path = "#")
private String string = "This is a String";
```

Path of the String: `additionalContainer`

:::note

Paths containing `#` won't work, outside an additional container.

:::

## Using complex data types

### Collections

Here are some examples of how to use the system with Collections.

```java
// Stating the implementation type in the annotation args.
@StorageData(type = ArrayList.class, valueTypes = String.class)
private List<String> stringList = new ArrayList<>();

// Stating the implementation type in the field itself.
@StorageData(valueTypes = String.class)
private ArrayList<String> stringList = new ArrayList<>();
```

Collections containing another Collection:

```java
@StorageData(valueTypes = {List.class, String.class})
private ArrayList<List<String>> stringListList = new ArrayList<>();
```

:::note

Inner Collections will always be ArrayLists, when deserialized. There is currently no way of changing this behaviour, but there might be in the future.

:::

### Maps

Here are some examples of how to use the system with Maps.

```java
// Stating the implementation type in the annotation args.
@StorageData(type = HashMap.class, keyTypes = String.class, valueTypes = Integer.class)
private Map<String, Integer> stringIntegerMap = new HashMap<>();

// Stating the implementation type in the field itself.
@StorageData(keyTypes = String.class, valueTypes = Integer.class)
private HashMap<String, Integer> stringIntegerMap = new HashMap<>();
```

Maps containing another Map:

```java
@StorageData(keyTypes = {String.class, Integer.class}, valueTypes = {Map.class, Boolean.class})
private HashMap<String, Map<Integer, Boolean> stringIntegerBooleanMap = new HashMap<>();
```

:::note

Inner Maps will always be HashMaps, when deserialized. There is currently no way of changing this behaviour, but there might be in the future.

:::

### Custom data types

Using custom data types requires the registration of a [StorageDataTranslator](https://github.com/DRE2N/Bedrock/blob/master/src/main/java/de/erethon/bedrock/config/storage/StorageDataTranslator.java).
For the specific class type. See [next](/bedrock/storage-data-translators) page.