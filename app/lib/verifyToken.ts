import axios from "axios";
import Cookies from "js-cookie";

const verifyToken = async () => {
    const token = Cookies.get("authtoken");

    const response = await axios.get("api/verifyToken",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        },
    )

    if (response.status === 200) {
        return true;
    };

    return false;
}

export default verifyToken;