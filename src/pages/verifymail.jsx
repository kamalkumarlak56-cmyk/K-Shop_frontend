import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "@/lib/auth";

const Verifymail = () => {
    const navigate = useNavigate()
    const [status, setstatus] = useState("Verifying...");
    const { token } = useParams();
    const verifymail = useCallback(async () => {
        try {
            const res = await axios.post(`${apiBaseUrl}/api/user/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                setstatus("✅ Email Verified Successfully.");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

        } catch (error) {
            console.log(error);
            setstatus("❌ Verification failed, please try again.")
        }
    }, [navigate, token]);

    useEffect(() => {
            const timeoutId = setTimeout(verifymail, 0);

            return () => clearTimeout(timeoutId);
    }, [verifymail]);
    
    return (
        <div className="w-screen h-screen flex justify-center items-center overflow-hidden bg-pink-100">
            <div className="max-w-sm p-5 text-center bg-white">
                <div className="text-2xl text-green-500 font-bold">{status}</div>

            </div>

        </div>
    )
}

export default Verifymail

