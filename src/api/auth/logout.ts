export const logout = (cookies: any) => {
	cookies.delete("authToken", { path: "/" });
};
