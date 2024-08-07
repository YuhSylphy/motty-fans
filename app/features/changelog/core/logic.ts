export const fetchChangeLogs = () =>
	fetch(`${import.meta.env.BASE_URL}/assets/change-log.md`).then((res) =>
		res.text()
	);
