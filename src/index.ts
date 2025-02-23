/*!
 * @file index.ts
 * @description The main file for `remote-elements`.
 * @version v1.0.0
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
    allowScripts?: boolean,
    allowImages?: boolean,
}

/*
 * @file remote-elements (index.ts)
 * @description A browser library to safely serialize, deserialize and sync elements from a server.
 * @version v1.0.0
 */

/**
 * An object to serialize and deserialize elements to be used for HTTP/WebSockets. Also can be used to synchronize data from a server.
 */
namespace Remote {
    /**
     * Serializes an element
     * @param element The element to serialize
     * @returns The serialized JSON.
     */
    export function serialize(element: Element) {
        return JSON.stringify({
            version: 1,
            element: element.outerHTML
        })

    }
    /**
     * Synchronizes and updates specific elements based on the server.
     * @param url The server URL to be used
     * @param options The options to be used for safety.
     * @returns An object to stop the server connection.
     */
    export function syncElements(url: string, options?: RemoteOptions): {close: () => void} {
        const options_: any = options || {allowImages: false, allowScripts: false, __default: true}
        if (options_.__default) {
            console.warn("Current options are configured to prevent self-XSS and malicious content. To bypass this please modify your options parameter.");
        }
        const ws = new WebSocket(url);

        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
    
                if (data.version === 1 && data.id && data.element) {

                    const newElement = Remote.deserialize(data);
                    if (newElement?.querySelector("script") && !options_.allowScripts) {
                        console.error("Data is not injected because the configuration forbids scripts, but the server sent one! (may be malicious)");
                        return;
                    }
                    if (newElement?.querySelector("img") && !options_.allowImages) {
                        console.error("Data is not injected because the configuration forbids scripts, but the server sent one! (may be malicious)");
                        return;
                    }
                    if (newElement) {
                        const existingElement = document.getElementById(data.id);
                        
                        if (existingElement) {
                            existingElement.replaceWith(newElement);
                        } else {
                            document.body.appendChild(newElement);
                        }
                    }
                }
            } catch (err) {
                console.error("Error processing WebSocket message:", err);
            }
        };
    
        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
        return {
            close: () => {
                ws.close();
            }
        }
    }
    
    /**
     * Unsafely deserializes, without any protection.
     * @param serialized 
     * @returns The deserialized data.
     */
    export function deserialize(serialized: string): Element | null {
        const parsedData = JSON.parse(serialized);
    
        const { element } = parsedData;
    
        const parser = new DOMParser();
        const doc = parser.parseFromString(element, 'text/html');
    

        return doc.body.firstElementChild;
    }
    /**
     * Safely deserializes, with options to forbid scripts, images and more.
     * @param serialized 
     * @returns The deserialized data.
     */
    export function deserializeSafe(serialized: string, options?: RemoteOptions): Element | null {
        const options_: any = options || {allowImages: false, allowScripts: false, __default: true}
        if (options_.__default) {
            console.warn("Current options are configured to prevent cross-site scripting and malicious content. To bypass this please modify your options parameter.");
        }
        const parsedData = JSON.parse(serialized);
    
        const { element_ } = parsedData;
    
        const parser = new DOMParser();
        const doc = parser.parseFromString(element_, 'text/html');
        const element = doc.body.firstElementChild;
        if (element?.querySelector("script") && !options_.allowScripts) {
            console.error("Data is not injected because the configuration forbids scripts, but the parameters sent one! (may be malicious)");
            return null;
        }
        if (element?.querySelector("img") && !options_.allowImages) {
            console.error("Data is not injected because the configuration forbids scripts, but the parameters sent one! (may be malicious)");
            return null;
        }
        return doc.body.firstElementChild;
    }
}

globalThis.remote = Remote; // Global exports
export default Remote;