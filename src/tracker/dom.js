var DOM = (function(){
  var createElement = (tag, parent) => {
    var ele = document.createElement(tag);
    parent.appendChild(ele);
    return ele;
  };
  
  return {
    /*
     * Returns a child element by its ID. Parent defaults to the entire document.
     */
    id: (id, parent) => (parent || document).getElementById(id),
    
    /*
     * Returns an array of all child elements containing the specified class. Parent defaults to the entire document.
     */
    cls: (cls, parent) => Array.prototype.slice.call((parent || document).getElementsByClassName(cls)),
    
    /*
     * Returns an array of all child elements that have the specified tag. Parent defaults to the entire document.
     */
    tag: (tag, parent) => Array.prototype.slice.call((parent || document).getElementsByTagName(tag)),
    
    /*
     * Returns the first child element containing the specified class. Parent defaults to the entire document.
     */
    fcls: (cls, parent) => (parent || document).getElementsByClassName(cls)[0],
    
    /*
     * Returns the first child element that has the specified tag. Parent defaults to the entire document.
     */
    ftag: (tag, parent) => (parent || document).getElementsByTagName(tag)[0],
    
    /*
     * Creates an element, adds it to the DOM, and returns it.
     */
    createElement: (tag, parent) => createElement(tag, parent),
    
    /*
     * Removes an element from the DOM.
     */
    removeElement: (ele) => ele.parentNode.removeChild(ele),
    
    /*
     * Creates a new style element with the specified CSS contents and returns it.
     */
    createStyle: (styles) => {
      var ele = createElement("style", document.head);
      styles.forEach(rule => ele.sheet.insertRule(rule, 0));
      return ele;
    },
    
    /*
     * Convenience setTimeout function to save space after minification.
     */
    setTimer: (callback, timeout) => window.setTimeout(callback, timeout),
    
    /*
     * Convenience addEventListener function to save space after minification.
     */
    listen: (ele, event, callback) => ele.addEventListener(event, callback),
    
    /*
     * Utility function to save an object into a cookie.
     */
    saveToCookie: (name, obj, expiresInSeconds) => {
      var expires = new Date(Date.now()+1000*expiresInSeconds).toUTCString();
      document.cookie = name+"="+encodeURIComponent(JSON.stringify(obj))+";path=/;expires="+expires;
    },
    
    /*
     * Utility function to load an object from a cookie.
     */
    loadFromCookie: (name) => {
      var value = document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+name+"\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
      return value.length ? JSON.parse(decodeURIComponent(value)) : null;
    },
    
    /*
     * Triggers a UTF-8 text file download.
     */
    downloadTextFile: (fileName, fileContents) => {
      var url = window.URL.createObjectURL(new Blob([fileContents], { "type": "octet/stream" }));
      
      var ele = createElement("a", document.body);
      ele.href = url;
      ele.download = fileName;
      ele.style.display = "none";
      
      ele.click();
      
      document.body.removeChild(ele);
      window.URL.revokeObjectURL(url);
    }
  };
})();
