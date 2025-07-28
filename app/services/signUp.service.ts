import axios from "axios";

async function signUpService(formBody: Record<string, any>) {
    try {
        const url = formBody.role === "user"
            ? "http://localhost:4000/user/actions/sign-up"
            : "http://localhost:4000/captain/actions/registerCaptain";

        const response = await axios.post(url,
            formBody
            ,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => true
            }
        );

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default signUpService;