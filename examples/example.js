import NmdFileDrop from "../js/nmdFileDrop.js";
customElements.define("nmd-filedrop", NmdFileDrop);

// you can choose name for element in html
// customElements.define("nmd-example", NmdFileDrop);

/** @type {NmdFileDrop} */
let fileDrop = document.querySelector("nmd-filedrop");

fileDrop.setClassMessage({default: {header: "Warning: ", message: "You can drop only one file."}});
