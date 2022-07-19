interface Msg {
	default: {
		header: string;
		message: string;
		img: string;
	};
	error: {
		header: string;
		message: string;
		img: string;
	};
	success: {
		header: string;
		message: string;
		img: string;
	};
	warning: {
		header: string;
		message: string;
		img: string;
	}
}