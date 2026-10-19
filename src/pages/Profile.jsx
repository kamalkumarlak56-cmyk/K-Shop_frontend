import { ArrowLeft, Mail, MapPin, Phone, UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "@/components/Footer"
import { getStoredUser } from "@/lib/auth"

const Profile = () => {
    const user = getStoredUser() || {}

    return <>
        <main className="min-h-[70vh] bg-[#f7f8f6] px-5 pb-20 pt-32 text-[#11151d] sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">
                <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-cyan-700">
                    <ArrowLeft size={17} /> Back to home
                </Link><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <div className="bg-[#11151d] px-6 py-10 text-white sm:px-10">
                        <div className="flex size-16 items-center justify-center rounded-full bg-cyan-300 text-2xl font-bold text-[#11151d]">{(user.firstName || "U").charAt(0).toUpperCase()}
                        </div>
                        <h1 className="mt-5 font-heading text-4xl font-bold">{user.firstName || "User"} {user.lastName || ""}
                        </h1>
                        <p className="mt-2 text-slate-400">Your K-Shop account
                        </p>
                    </div>
                    <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
                        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                            <Mail className="mt-0.5 text-cyan-700" size={19} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email
                                </p>
                                <p className="mt-1 font-semibold">{user.email || "Not available"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                            <UserRound className="mt-0.5 text-cyan-700" size={19} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Account type
                                </p>
                                <p className="mt-1 font-semibold">{user.role || "Customer"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                            <Phone className="mt-0.5 text-cyan-700" size={19} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone
                                </p>
                                <p className="mt-1 font-semibold">{user.phoneNo || "Not added"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">

                            <MapPin className="mt-0.5 text-cyan-700" size={19} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Address
                                </p>
                                <p className="mt-1 font-semibold">{user.address || "Not added"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
}

export default Profile
