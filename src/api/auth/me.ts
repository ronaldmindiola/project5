export const getMe = async (token: string) => {
	const res = await fetch("http://localhost:1337/api/users/me", {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) {
		throw new Error("Unauthorized");
        console.log("Unauthorized");
	}

	return res.json();
};
