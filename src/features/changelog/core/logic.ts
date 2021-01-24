export const fetchChangeLogs = () =>
	fetch(`${process.env.PUBLIC_URL}/assets/change-log.md`).then((res) =>
		res.text()
	);
