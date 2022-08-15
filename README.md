# Nmd-filedrop [![npm](https://img.shields.io/npm/v/nmd-filedrop?style=for-the-badge)](https://www.npmjs.com/package/nmd-filedrop)

Simple element to replace `<input type="file">`.

## Options 
- Accept: Same attribute as file input. Filter file extensions in windows explorer: `<nmd-filedrop accept="application/pdf"></nmd-filedrop>`
- Regex: Simply enter regex for file type to accept: `<nmd-filedrop regex="json|pdf"></nmd-filedrop>`
- Name: Add name to main file input exp: `<nmd-filedrop name="file"></nmd-filedrop>`
- Multiple: Only if you multiple. If you are using PHP be sure you type "[]" in name. `<nmd-filedrop name="file[]" multiple></nmd-filedrop>`
- If not multiple, new file will override the uploaded one

```html
<!DOCTYPE html>
<html>
	<body>
		<nmd-filedrop regex="pdf|xml|png|cert|avi|text" accept="application/pdf" multiple></nmd-filedrop>
	</body>
</html>
```
## Import
In your layout just import: 
`<link rel="stylesheet" href="../css/nmdfiledrop.css">`

`<script src="../js/index.js" type="module"></script>`

If you don't using webpack, don't forget to add `type="module"`.
Also you have to add path to node modules like `<script src="node_modules/nmd-filedrop/js/index.js" type="module"></script>` with path for node modules.

To change icons, you have to provide html in string. You can find in example.js with method set ClassMessage.

## Events
file-added: file occurs when file(s) added.
event detail contains:
- newFiles (list of all files)
- originalFiles (list of all files except new ones)
Event is cancelable. In the case ` e.preventDefault()`, html with files won't redraw. You can show list of uploaded files somewhere else.

`const fileDrop = document.querySelector('nmd-filedrop')`

`fileDrop.addEventListener('file-added, e => {e.preventDefault()})'`
