export const log = (message: string) => {
	const now = new Date();
	const timestamp = now
		.toLocaleString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		})
		.replace(",", "");
	console.log(`[${timestamp}] ${message}`);
};
