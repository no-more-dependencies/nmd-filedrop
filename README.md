# Nmd-DropFile [![npm](https://img.shields.io/npm/v/nmd-filedrop?style=for-the-badge)](https://www.npmjs.com/package/nmd-filedrop)

Simple element to replace `<input type="file">`.

## Options 
- Accept: Same attribute as file input. Filter file extensions in windows explorer: `<nmd-dropfile accept="application/pdf"></nmd-dropfile>`
- Regex: Simply enter regex for file type to accept: `<nmd-dropfile regex="json|pdf"></nmd-dropfile>`
- Name: Add name to main file input exp: `<nmd-dropfile name="file"></nmd-dropfile>`
- Multiple: Only if you multiple. If you are using PHP be sure you type "[]" in name. `<nmd-dropfile name="file[]" multiple></nmd-dropfile>`
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
`<link rel="stylesheet" href="../css/nmdDropfile.css">`

`<script src="../js/index.js" type="module"></script>`

If you don't using webpack, don't forget to add `type="module"`.
Also you have to add path to node modules like `<script src="node_modules/nmd-filedrop/js/index.js" type="module"></script>` with path for node modules.

To change icons, you have to provide html in string. You can find in example.js with method set ClassMessage.