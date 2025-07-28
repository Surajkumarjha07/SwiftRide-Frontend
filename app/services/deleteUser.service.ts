import axios from "axios";

async function deleteUser(role: string, cookie: string, oldPassword: string) {
    try {
        const url = role === "user"
            ? "http://localhost:4000/user/actions/delete-user"
            : "http://localhost:4000/captain/actions/deleteCaptain";

        const response = await axios.delete(url,
            {
                data: {
                    password: oldPassword
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true,
                validateStatus: status => true
            }
        )

        return response;

    } catch (error) {        
        throw new Error((error as Error).message);
    }
}

export default deleteUser;