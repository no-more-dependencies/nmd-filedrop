/** @type {import("nmd-filedrop").Config} msg */
const config = {
	icons: {
		"default": `<svg fill="#e6e6e6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
			<path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/>
			</svg>`,
		"error": `<svg fill="#e6e6e6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
			<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
			</svg>`,
		"success": `<svg fill="#e6e6e6"
			xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
		</svg>`,
		"warning": `<svg fill="#e6e6e6"
			xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
			</svg>`,
		
	},
	cs: {
		default: "<strong>Klikněte</strong> nebo přetáhněte soubory",
		error: "Chyba: Špatný formát souboru",
		success: "Přetáhněte pro přidání souboru",
		warning: "Soubory obsahují špatný typ souboru"
	},
	en: {
		default: "<strong>Click</strong> or drop files here",
		error: "Error: Bad file format",
		success: "Drop to add file(s)",
		warning: "File(s) contain bad mime type"
	},
	pl: {
		default: "<strong>Kliknij</strong> lub przeciągnij pliki",
		error: "Błąd: Zły format pliku",
		success: "Upuść, aby dodać plik",
		warning: "Pliki zawierają zły typ pliku"
	}
}

export { config }