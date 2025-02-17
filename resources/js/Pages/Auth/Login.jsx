import { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Auth({ status, canResetPassword }) {
    const [isRegister, setIsRegister] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        name: "", // Only used for registration
        password_confirmation: "", // Only used for registration
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (isRegister) {
            post(route("login"));
        } else {
            post(route("login"));
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                {isRegister ? (
                                    <i class="fa-solid fa-user-plus text-red-600 fa-lg"></i>
                                ) : (
                                    <i className="fas fa-sign-in-alt text-red-600 fa-lg"></i>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {isRegister
                                    ? "Create an Account"
                                    : "Welcome Back!"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {isRegister
                                    ? "Sign up to get started"
                                    : "Please sign in to continue"}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            {isRegister && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="Your Name"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    placeholder="you@example.com"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword
                                                    ? "fas fa-eye-slash"
                                                    : "fas fa-eye"
                                            }
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {isRegister && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {!isRegister && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-red-600 hover:text-red-700"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                            )}

                            <button
                                className="mt-6 w-full bg-red-500 p-2 hover:bg-gray-100 duration-300 rounded-md text-white font-semibold"
                                disabled={processing}
                            >
                                {isRegister ? "Sign Up" : "Sign In"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-gray-600">
                            {isRegister
                                ? "Already have an account? "
                                : "Don't have an account? "}
                            <button
                                className="text-red-600 hover:text-red-700 font-semibold"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? "Sign in" : "Sign up"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1677543938193-6050960bef16?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            >
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white px-12">
                        <h2 className="text-4xl font-bold mb-6">PDM Sleman</h2>
                        <p className="text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
