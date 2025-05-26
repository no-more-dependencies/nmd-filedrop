declare module "nmd-filedrop" {
	/**
	 * Configuration options for the application.
	 * Includes icon definitions and localization settings.
	 */
	interface Config {
		/**
		 * Icon definitions used throughout the application.
		 */
		icons: Icon;
		/**
		 * Localization settings for language support.
		 * Each language key maps to an object with message types as keys ("default", "error", "success", "warning") and their corresponding text.
		 * Text can contain HTML.
		 */
		[lang: string]: {
			default: string;
			error: string;
			success: string;
			warning: string;
		};
	}

	/**
	 * Represents a set of image paths or URLs for different message types.
	 */
	interface Icon {
		/**
		 * Image for the default message type.
		 */
		default: string;
		/**
		 * Image for the error message type.
		 */
		error: string;
		/**
		 * Image for the success message type.
		 */
		success: string;
		/**
		 * Image for the warning message type.
		 */
		warning: string;
	}

}