export interface LoginResponse {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export const login = async (identifier: string, password: string): Promise<LoginResponse> => {
	const res = await fetch("http://localhost:1337/api/auth/local", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ identifier, password }),
	});

	if (!res.ok) {
		throw new Error("Invalid credentials");
        console.log("Invalid credentials");
        
	}

	return res.json();
};
