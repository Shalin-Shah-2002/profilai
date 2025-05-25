import React from "react"
import Login from "./Login/login"
import "./signup.css"




export const Signup = () => {
    var [isOpen, setIsOpen] = React.useState(false)
    var [PageChange, setPageChange] = React.useState("Login")


    const toggle = () => {
        setIsOpen(!isOpen)
        if (isOpen) {
            setPageChange("Signup")
        } else {
            setPageChange("Login")
        }
    }
    const GoogleLoginButton = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
        console.log("Google Login Button Clicked")
    }

    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 flex items-center justify-center p-4 md:p-6 lg:p-8 font-sans">
                <div className="w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(124,58,237,0.5)]">
                    <div className="p-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined text-3xl">person_add</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">Create Account</h1>
                        <p className="text-gray-500 text-center mb-8">Join our community today</p>
                        {console.log("sdasd")}

                        <form>
                            <div className="space-y-4">

                                {isOpen ? <Login /> : null}

                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <span className="material-symbols-outlined text-sm">mail</span>
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                            placeholder="johndoe@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                        </span>
                                        <input
                                            type="password"
                                            id="password"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                {isOpen ? <div className="flex items-center">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the{" "}
                                        <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div> : null}

                                {/* Next: "Add password strength indicator" */}

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-xl shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {PageChange !== "Login" ? "Login" : "Create Account"}
                                </button>
                            </div>
                        </form>

                        <div className="relative flex py-5 items-center mt-8">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-6">
                            <button onClick={GoogleLoginButton}
                                className="flex items-center justify-center w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                                <i className="fa-brands fa-google text-xl group-hover:text-red-500 transition-colors"></i>
                            </button>
                            <button onClick={() => { console.log("Google Login Button Clicked") }}
                                className="flex items-center justify-center w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                                <i className="fa-brands fa-facebook text-xl group-hover:text-blue-600 transition-colors"></i>
                            </button>
                            <button className="flex items-center justify-center w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                                <i className="fa-brands fa-apple text-xl group-hover:text-black transition-colors"></i>
                            </button>
                        </div>
                        {/* Next: "Add social proof section with user testimonials" */}

                        <p className="text-center mt-8 text-sm text-gray-600">
                            Already have an account?
                            <a href="#" className="text-purple-600 font-medium ml-1 hover:underline" onClick={toggle}>
                                {PageChange}
                            </a>
                        </p>
                    </div>

                    <div className="w-full h-2 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800"></div>
                </div>
            </div>
        </div>
    )
}

export default Signup