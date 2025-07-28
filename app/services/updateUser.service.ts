import axios from "axios";

async function updateUser(role: string, formBody: Record<string, any>, cookie: string) {
    try {
        const url = role === "user" ? "http://localhost:4000/user/actions/update-user" : "http://localhost:4000/captain/actions/updateCaptain";

        const response = await axios.put(url,
            formBody
            ,
            {
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

export default updateUser;