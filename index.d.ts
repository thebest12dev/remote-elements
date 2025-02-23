/*!
 * @file index.ts
 * @description The main file for `remote-elements`.
 * @version v1.1.0
 *
 * Copyright (c) 2025 thebest12lines
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Options to control certain types of content.
 */
type RemoteOptions = {
    allowScripts?: boolean;
    allowImages?: boolean;
};
/**
 * An object to serialize and deserialize elements to be used for HTTP/WebSockets. Also can be used to synchronize data from a server.
 */
declare namespace Remote {
    /**
     * Serializes an element
     * @param element The element to serialize
     * @returns The serialized JSON.
     */
    function serialize(element: Element): string;
    /**
     * Synchronizes and updates specific elements based on the server.
     * @param url The server URL to be used
     * @param options The options to be used for safety.
     * @returns An object to stop the server connection.
     */
    function syncElements(url: string, options?: RemoteOptions): {
        close: () => void;
    };
    /**
     * Unsafely deserializes, without any protection.
     * @param serialized
     * @returns The deserialized data.
     */
    function deserialize(serialized: string): Element | null;
    /**
     * Safely deserializes, with options to forbid scripts, images and more.
     * @param serialized
     * @returns The deserialized data.
     */
    function deserializeSafe(serialized: string, options?: RemoteOptions): Element | null;
}
