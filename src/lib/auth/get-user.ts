export async function getUserFromToken(token: string) {
    const res = await fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
  
    const user = await res.json();
    return user;
  }
  