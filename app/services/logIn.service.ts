import axios from "axios";

async function logInService(formBody: Record<string, any>) {
    try {
        const url = formBody.role === "user"
            ? "http://localhost:4000/user/actions/log-in"
            : "http://localhost:4000/captain/actions/loginCaptain";

        const response = await axios.post(url,
            formBody
            ,
            {
                headers: {
                    "Content-Type": "application/json"
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

export default logInService;