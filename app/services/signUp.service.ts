
async function signUpService(formBody: Record<string, any>, role: string) {
    try {
        const url = role === "user" ? "http://localhost:4000/user/actions/sign-up" : "http://localhost:4000/captain/actions/registerCaptain";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formBody)
        })

        const data = await response.json();

        return { response, data };

    } catch (error) {
        throw new Error("Internal server error!");
    }
}

export default signUpService;