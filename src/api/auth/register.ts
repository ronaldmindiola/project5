export const register = async (username: string, email: string, password: string) => {
	const res = await fetch("http://localhost:1337/api/auth/local/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, email, password }),
	});

	if (!res.ok) {
		throw new Error("Registration failed");
	}

	return res.json();
};
