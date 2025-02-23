# remote-elements
A lightweight library to safely serialize and deserialize HTML element data for HTTP/WebSocket as well as update elements in real-time by the server without using heavy frameworks like React.

## Examples
To serialize an HTML element:
```js
// Query the element
const element = document.querySelector("p#foo");

// Serialize the element
const serialized = remote.serialize(element);

// Deserialize it
const deserialized = remote.deserialize(element) // Works fine!
```

It can also support content sanitizing like here: To serialize an HTML element:
```js
// Query the element
const element = document.querySelector("div#bar"); // Contains a <script> tag.

// Serialize the element
const serialized = remote.serialize(element);

// Deserialize it
const deserialized = remote.deserialize(element) // Will throw error!

const deserialized = remote.deserialize(element, {allowScripts: true}) // Works fine!
```

To start synchronizing elements:
```js
// Now, servers can update elements on the browser. By default, it forbids scripts and images.
remote.syncElements("wss://example.com");
```