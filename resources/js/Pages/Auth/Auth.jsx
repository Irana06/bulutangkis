import { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Auth({
    status,
    canResetPassword,
    isRegister: initialIsRegister,
}) {
    const [isRegister, setIsRegister] = useState(initialIsRegister);
    const [ready, setReady] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        name: "",
        password_confirmation: "",
        namaKontingen: "",
        emailKontingen: "",
        retypePassword: "",
        penanggungJawab: "",
        noTelepon: "",
        asalKontingen: "DALAM_NEGERI",
        alamat: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route(isRegister ? "register" : "login"));
    };

    return (
        <div className="min-h-screen flex overflow-hidden relative">
            {/* Background Section */}
            <motion.div
                initial={ready ? { x: isRegister ? "0%" : "100%" } : false}
                animate={{ x: isRegister ? "-100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="hidden lg:block lg:w-1/2 bg-cover bg-center absolute top-0 left-0 h-full"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1625480862383-7f6593ade292?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
            </motion.div>
            <motion.div
                initial={ready ? { x: isRegister ? "-200%" : "0%" } : false}
                animate={{ x: isRegister ? "100%" : "200%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="hidden lg:block lg:w-1/2 bg-cover bg-center absolute top-0 left-0 h-full"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1626326880051-9320471299c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
            </motion.div>

            {/* Form Section */}
            <motion.div
                initial={ready ? { x: isRegister ? "-100%" : "0%" } : false}
                animate={{ x: isRegister ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10"
            >
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                {isRegister ? (
                                    <i className="fa-solid fa-user-plus text-red-600 fa-lg"></i>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="namaKontingen"
                                            value="Nama Kontingen"
                                        />
                                        <TextInput
                                            id="namaKontingen"
                                            name="namaKontingen"
                                            value={data.namaKontingen}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "namaKontingen",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.namaKontingen}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="emailKontingen"
                                            value="Email Kontingen"
                                        />
                                        <TextInput
                                            id="emailKontingen"
                                            type="email"
                                            name="emailKontingen"
                                            value={data.emailKontingen}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "emailKontingen",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.emailKontingen}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="penanggungJawab"
                                            value="Nama Penanggung Jawab"
                                        />
                                        <TextInput
                                            id="penanggungJawab"
                                            name="penanggungJawab"
                                            value={data.penanggungJawab}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "penanggungJawab",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.penanggungJawab}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="noTelepon"
                                            value="No. Telp Penanggung Jawab"
                                        />
                                        <TextInput
                                            id="noTelepon"
                                            name="noTelepon"
                                            value={data.noTelepon}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "noTelepon",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.noTelepon}
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel
                                            htmlFor="asalKontingen"
                                            value="Asal Kontingen"
                                        />
                                        <select
                                            id="asalKontingen"
                                            name="asalKontingen"
                                            value={data.asalKontingen}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            onChange={(e) =>
                                                setData(
                                                    "asalKontingen",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="DALAM_NEGERI">
                                                Dalam Negeri
                                            </option>
                                            <option value="LUAR_NEGERI">
                                                Luar Negeri
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.asalKontingen}
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel
                                            htmlFor="alamat"
                                            value="Alamat Lengkap"
                                        />
                                        <TextInput
                                            id="alamat"
                                            name="alamat"
                                            value={data.alamat}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError message={errors.alamat} />
                                    </div>
                                </div>
                            )}

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
                                    <InputLabel
                                        htmlFor="retypePassword"
                                        value="Retype Password"
                                    />
                                    <TextInput
                                        id="retypePassword"
                                        type="password"
                                        name="retypePassword"
                                        value={data.retypePassword}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        onChange={(e) =>
                                            setData(
                                                "retypePassword",
                                                e.target.value
                                            )
                                        }
                                        placeholder="••••••••"
                                        required
                                    />
                                    <InputError
                                        message={errors.retypePassword}
                                    />
                                </div>
                            )}

                            <button
                                className="mt-6 w-full bg-red-500 p-2 hover:bg-red-100 hover:shadow-lg hover:shadow-red-300 rounded-md text-white hover:text-red-500 font-semibold duration-300"
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
                                className="text-red-300 hover:text-red-500 duration-300 font-semibold"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? "Sign in" : "Sign up"}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
