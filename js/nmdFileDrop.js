/// <reference path="./types.d.ts"/>
import { Msg } from "./Msg.js"
export default class NmdFileDrop extends HTMLElement {
	constructor() {
		super()
		this.counter = 0
		this.classMessage = structuredClone(Msg)
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

		/** @type {HTMLInputElement} */
		this.sideInput = this.querySelector("input[type=file]")

		/** @type {HTMLInputElement} */
		this.mainInput = this.querySelectorAll("input[type=file]")[1]
		this.registerEventListeners()
	}

	drawUI() {
		this.innerHTML = `
			<input type="file" ${this.multiple ? "multiple" : ""} ${this.accept ? 'accept="' + this.accept + '"' : ""} hidden> 
			<input type="file" name="${this.name ? this.name : "file"}" ${this.multiple ? "multiple" : ""} hidden >
			<div class="drop-area">
				<div class="status-img">${this.class ? this.classMessage[this.class].img : this.classMessage.default.img}</div>
				<div class="status-text"><span class="bolder">${this.class ? this.classMessage.this.class.header : this.classMessage.default.header}</span>
				${this.class ? this.classMessage.class.message : this.classMessage.default.message}</div>
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

			this.insertFiles(e.dataTransfer.files)
		})

		// INPUT EVENT (input files to secondary input)
		this.sideInput.addEventListener("change", e => {
			e.preventDefault()

			for (let file of e.target.files) {
				if (!this.checkFileType(file)) {
					this.class = "error"
					setTimeout(() => { this.class = "default" }, 1000)
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
		let message = this.classMessage[classResult]

		if (this.classMessage[classResult] == null)
			throw new Error(`Class ${classResult} not found`);

		this.replaceStatusMessage(message.img, message.header, message.message)
	}

	replaceStatusMessage(newImg, newHeader, newMessage) {
		let img = this.querySelector(".status-img")
		let message = this.querySelector(".status-text")
		img.innerHTML = newImg
		message.innerHTML = `<span class="bolder">${newHeader}</span> ${newMessage}`
	}

	/**
	 * 
	 * @param {FileList} files 
	 * @returns {void}
	 */
	insertFiles(files) {
		if (files.length == 0)
			return

		let dataTransfer = new DataTransfer()

		if (this.multiple) {
			for (let file of this.mainInput.files)
				dataTransfer.items.add(file)
		}


		for (let file of files) {
			if (this.checkFileType(file)) {
				dataTransfer.items.add(file)

				if (!this.multiple)
					break
			}
		}

		const cb = this.dispatchEvent(new CustomEvent("file-added", {
			detail: {
				newFiles: dataTransfer.files,
				originalFiles: this.mainInput.files
			},
			cancelable: true,
		}))

		this.mainInput.files = dataTransfer.files

		if (cb)
			this.drawFileList()
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

		this.drawFileList()

	}

	/**
	 * @returns {FileList}
	 */
	getFiles() {
		return this.mainInput.files
	}

	// UPDATE VIEW OF FILES
	drawFileList() {
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
	setClassMessage(classMsg) {

		if (typeof classMsg != "object")
			throw new Error("ClassMsg must be an object")

		for (let key in classMsg) {
			if (typeof classMsg[key] == "object" && this.classMessage[key] != "undefined") {
				Object.assign(this.classMessage[key], classMsg[key])
			}
		}
		
		this.setResultMessage("default")
	}

	getClassMessage() {
		return classMessage
	}
}