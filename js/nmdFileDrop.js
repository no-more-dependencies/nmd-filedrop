/// <reference path="./types.d.ts"/>

/**
 * @type {Msg}
 */
let classMessage = {
	"default": {
		header: "Choose",
		message: 'or drop files here',
		img: `<svg fill="#e6e6e6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
			<path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/>
			</svg>`,
	},
	"error": {
		header: 'Error',
		message: 'Bad file format',
		img: `<svg fill="#e6e6e6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
			<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
			</svg>`,
	},
	"success": {
		header: 'Success',
		message: 'drop to add file(s)',
		img: `<svg fill="#e6e6e6"
			xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
		</svg>`,
	},
	"warning": {
		header: 'Warning',
		message: "File(s) contain bad mime type",
		img: `<svg fill="#e6e6e6"
			xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
			</svg>`,
	}
}


export default class NmdFileDrop extends HTMLElement {
	constructor() {
		super()
		this.counter = 0
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "class") {
			if (newValue == "")
				this.setResultMessage("default")
			else
				this.setResultMessage(newValue)
		}
	}

	static get observedAttributes() {
		return ['class', "regex"]
	}

	connectedCallback() {
		this.drawUI()

		this.sideInput = this.querySelector("input[type=file]")
		this.mainInput = this.querySelectorAll("input[type=file]")[1]

		this.registerEventListeners()
	}

	drawUI(){
		this.innerHTML = `
			<input type="file" ${this.multiple ? "multiple" : ""} ${this.accept ? 'accept="' + this.accept + '"' : ""} hidden> 
			<input type="file" name="${this.name ? this.name : "file"}" ${this.multiple ? "multiple" : ""} hidden >
			<div class="drop-area">
				${this.class ? classMessage.this.class.img : classMessage.default.img}
				<div><span class="bolder">${this.class ? classMessage.this.class.header : classMessage.default.header}</span>
				${this.class ? classMessage.this.class.message : classMessage.default.message}</div>
			</div>
			<div class="file-list ">
			</div>
		`
	}

	registerEventListeners() {


		// CLICK ON DROP AREA
		this.querySelector(".drop-area").addEventListener("click", () => {
			this.sideInput.click()
		}, true)

		// DRAGENTER
		this.addEventListener('dragenter', e => {
			if (this.counter++ > 0)
				return

			e.preventDefault()
			e.dataTransfer.dropEffect = 'copy'

			let error, success = false;

			console.log(e.dataTransfer.items[0])

			for (var i = 0; i < e.dataTransfer.items.length; i++) {
				this.checkFileType(e.dataTransfer.items[i]) ? success = true : error = true
			}

			if (error && success) {
				this.class = "warning"
				return
			}

			if (error) {
				this.class = "error"
				return
			}

			if (success) {
				this.class = "success"
				return
			}

		})

		// DRAGLEAVE
		this.addEventListener('dragleave', e => {
			if (--this.counter > 0)
				return

			this.class = ""
		}, true)

		// DRAGOVER
		this.addEventListener('dragover', e => {
			e.preventDefault()
		}, true)

		// DROP
		this.addEventListener('drop', e => {
			e.preventDefault()
			this.counter = 0
			this.class = ""

			console.log(e.dataTransfer.files[0])

			this.insertFiles(e.dataTransfer.files)
		})

		// CUSTOM EVENT
		this.querySelector(".file-list").addEventListener("click", e => {
			// TODO - delete clicked file
		})


		// INPUT EVENT (input files to secondary input)
		this.sideInput.addEventListener("change", e => {
			e.preventDefault()

			for (let file of e.target.files) {
				if (!this.checkFileType(file)) {
					this.class = "error"
					setTimeout(() => { this.class = "default" }, 1000) 
					return
				}
			}

			this.insertFiles(e.target.files)
		})

		// DELETE  SPAN CLICK
		this.querySelector(".file-list").addEventListener("click", e => {
			if (e.target.tagName == "SPAN" && e.target.getAttribute("data-file-id")) {
				let fileId = e.target.getAttribute("data-file-id")
				this.querySelectorAll(`[data-file-id="${fileId}"]`).forEach(el => el.remove(true))
				this.deleteFile(fileId)
			}
		})
	}

	/**
	 * 
	 * @param {DataTransferItem|File} file
	 * @returns {boolean}
	 */
	checkFileType(file) {
		if (DataTransferItem.prototype.isPrototypeOf(file) && file.kind != "file")
			return false

		let regex = new RegExp(this.regex, "i")
		let result = file.type.match(regex)

		if (result != null)
			return true

		return false
	}

	/**
	 * @param {string} classResult 
	 */
	setResultMessage(classResult) {
		let message = classMessage[classResult]

		if (classMessage[classResult] == null)
			throw new Error(`Class ${classResult} not found`);


		this.querySelector(".drop-area").innerHTML = `
			${message.img}
			<div><span class="bolder">${message.header}</span> ${message.message}</div>
		`
	}

	/**
	 * 
	 * @param {FileList} files 
	 * @returns {void}
	 */
	insertFiles(files) {
		if (files.length == 0)
			return
		/**
		* @type {HTMLInputElement}
		*/
		let fileInput = this.mainInput
		let dataTransfer = new DataTransfer()

		if (!this.multiple) {
			// Get all files from input and add to dataTransfer
			dataTransfer.items.add(files[0])
			fileInput.files = dataTransfer.files
			return
		} else {
			for (let item of fileInput.files) {
				dataTransfer.items.add(item)
			}

			for (let file of files) {
				if (this.checkFileType(file))
					dataTransfer.items.add(file)
			}

		}

		if (this.compareFileLists(dataTransfer.files, fileInput.files)) {
			//console.log("Files are the same")
		}

		const cb = this.dispatchEvent(new CustomEvent("files-changed", {
			detail: {
				newFiles: dataTransfer.files,
				originalFiles: fileInput.files
			},
			cancelable: true,
		}))

		fileInput.files = dataTransfer.files
		console.log(fileInput.files)

		if (cb)
			this.updateView()

	}

	/**
	 * @param {number} fileId
	 * @returns {void}
	 * @memberof FileDrop
	 * @description Delete file from fileList
	 */
	deleteFile(fileId) {
		let files = this.getFiles()
		let dataTransfer = new DataTransfer()

		for (let file of files) {
			dataTransfer.items.add(file)
		}

		dataTransfer.items.remove(fileId)

		this.mainInput.files = dataTransfer.files

		this.updateView()

	}

	/**
	 * @returns {FileList}
	 */
	getFiles() {
		return this.mainInput.files
	}

	// UPDATE VIEW OF FILES
	updateView() {
		this.getFiles().length > 0 ? this.querySelector(".file-list").classList.add("show") : this.querySelector(".file-list").classList.remove("show")

		let files = this.querySelector(".file-list") // HTML area with files
		let fileList = this.getFiles() // call method to get all actual files
		let html = [] // array with html

		for (let i = 0; i < fileList.length; i++) {
			let file = fileList.item(i)
			let fileSize = Math.round(file.size / 1024) > 1000 ? (file.size / 1024 / 1024).toFixed(1) + " MB" : (file.size / 1024).toFixed(1) + " KB"
			

			html.push(`
				<div class="file-name" data-file-id="${i}">${file.name}</div>
				<div class="file-size" data-file-id="${i}">${fileSize}</div>
				<div class="file-extension" data-file-id="${i}">${file.name.split('.').pop()}</div>
				<span class="delete" data-file-id="${i}"></span>
			`)
		}

		files.innerHTML = html.join("") // join array to string
	}

	/**
	 * @param {FileList} list1
	 * @param {FileList} list2
	 * @returns {boolean}
	 */
	compareFileLists(list1, list2) {
		if (list1.length != list2.length)
			return false
		for (let i = 0; i < list1.length; i++) {
			if (list1[i] != list2[i])
				return false
		}
		return true
	}

	// SECTION WITH GETTERS AND SETTERS

	set regex(regex) {
		this.setAttribute('regex', regex)
	}

	get regex() {
		return this.getAttribute('regex') || ""
	}

	get class() {
		return this.getAttribute('class')
	}

	set class(_class) {
		this.setAttribute('class', _class)
	}

	get name() {
		return this.getAttribute('name')
	}

	set name(name) {
		this.setAttribute('name', name)
	}

	get multiple() {
		return this.getAttribute("multiple") != null ? true : false
	}

	set accept(accept) {
		this.setAttribute('accept', accept)
	}

	get accept() {
		return this.getAttribute('accept')
	}

	/**
	 * @param {Msg} classMsg 
	 */
	setClassMessage(classMsg){

		if(typeof classMsg != "object")
			throw new Error("Class message must be object")

		for(let key in classMsg){
			if(typeof classMsg[key] == "object" && classMessage[key] != "undefined"){
				Object.assign(classMessage[key], classMsg[key])
			}
		}

		this.drawUI()
		this.updateView
	}


	getClassMessage(){
		return classMessage
	}
}