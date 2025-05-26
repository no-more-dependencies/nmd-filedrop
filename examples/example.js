import NmdFileDrop from "../js/nmdFileDrop.js";
customElements.define("nmd-filedrop", NmdFileDrop);

// you can choose name for element in html
// customElements.define("nmd-example", NmdFileDrop);

/** @type {NmdFileDrop} */
let fileDrop = document.querySelector("nmd-filedrop");

fileDrop.setConfig({"cs": {default: "nasrat"}});
