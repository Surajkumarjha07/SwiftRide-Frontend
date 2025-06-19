import Cookies from "js-cookie";

const verifyToken = async () => {
    const token = Cookies.get("authtoken");

    const response = await fetch("api/verifyToken", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    })

    return response;

}

export default verifyToken;