import axios from "axios";

async function logOutUser(role: string, cookie: string) {
    try {
        const url = role === "user"
            ? "http://localhost:4000/user/actions/logout"
            : "http://localhost:4000/captain/actions/logout";

        const response = await axios.post(url, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true,
                validateStatus: status => true
            }
        );

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default logOutUser;