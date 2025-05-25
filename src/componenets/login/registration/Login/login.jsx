import React from "react";

function Login() {
    return (<div className="group">
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
        </label>
        <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <span className="material-symbols-outlined text-sm">person</span>
            </span>
            <input
                type="text"
                id="fullname"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="John Doe"
            />
        </div>
    </div>)
}

export default Login;