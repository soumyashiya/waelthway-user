import './login.css'
import logo1 from '../assets/wealth-logo.svg'
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { loginUser } from '../api/auth/loginApi';
import { toast } from 'react-hot-toast';
import { addUser } from '../api/auth/SignupApi';
// Add Bootstrap Dropdown import
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS if not already imported

// Define types for FormData and Country
type FormData = {
    country: string;
    countryCode: string;
};

type Country = {
    cca2: string;
    name: { common: string };
    flag: string;
    callingCodes: string[];
};

const Login: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [countries, setCountries] = useState<Country[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [formData, setFormData] = useState<FormData>({ country: '', countryCode: '' });
    const [mode, setMode] = useState<'signup' | 'login' | 'forgot' | 'verify'>('login');
    const { setIsAuthenticated } = useAuth();

    // TanStack Query Mutation for login
    const mutation = useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            return loginUser(credentials);
        },
        onSuccess: (data) => {
            const userRole = data?.user?.role;
            if (!userRole) {
                toast.error("User role not found in response.");
                return;
            }
            setIsAuthenticated(true);
            if (userRole === "user") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        },
        onError: (error: any) => {
            toast.error("Login failed:", error.message);
            setError(error?.response?.data?.message || "Login failed. Please try again.");
        },
    });

    const signupMutation = useMutation({
        mutationFn: async (userData: {
            name: string;
            email: string;
            password: string;
            country: string;
            phone: string;
            countryCode: string;
        }) => {
            return addUser(userData);
        },
        onSuccess: (data) => {
            toast.success("Account created successfully!");
            console.log("Signup successful:", data);
            setMode("verify");
        },
        onError: (error: any) => {
            toast.error("Signup failed: " + (error.message || "Please try again"));
            setError(error?.response?.data?.message || "Signup failed. Please try again.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === "login") {
            if (!email || !password) {
                setError("Please enter both email and password");
                return;
            }
            mutation.mutate({ email, password });
        }
        else if (mode === "signup") {
            if (!name || !email || !password || !confirmPassword || !formData.country || !phone) {
                setError("Please fill in all fields");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            // Format phone number with country dial code
            const fullPhoneNumber = `+${formData.countryCode}${phone.replace(/^\+?/, '')}`;
            signupMutation.mutate({
                name,
                email,
                password,
                country: formData.country,
                phone: fullPhoneNumber,
                countryCode: formData.countryCode
            });
        }
    };
    // country code


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v2/all?fields=alpha2Code,name,flag,callingCodes");
                const data = await response.json();

                const formattedData = data
                    .filter((country: { callingCodes: string | any[]; }) => country.callingCodes && country.callingCodes.length > 0 && country.callingCodes[0] !== "")
                    .map((country: { alpha2Code: any; name: any; flag: any; callingCodes: any; }) => ({
                        cca2: country.alpha2Code,
                        name: { common: country.name },
                        flag: country.flag,
                        callingCodes: country.callingCodes
                    }))
                    .sort((a: { name: { common: string; }; }, b: { name: { common: any; }; }) => a.name.common.localeCompare(b.name.common));

                setCountries(formattedData);

                if (formattedData.length > 0) {
                    const usCountry = formattedData.find((c: { cca2: string; }) => c.cca2 === "US") || formattedData[0];
                    setFormData(prev => ({
                        ...prev,
                        country: usCountry.name.common,
                        countryCode: usCountry.callingCodes[0]
                    }));
                    setCountry(usCountry.name.common);
                }
            } catch (error) {
                console.error("Failed to fetch countries:", error);
                toast.error("Failed to load country data");
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    const handleCountrySelect = (country: { cca2?: string; name: any; flag?: string; callingCodes: any; }) => {
        setFormData(prev => ({
            ...prev,
            country: country.name.common,
            countryCode: country.callingCodes[0]
        }));
        setCountry(country.name.common);
        setShowCountryDropdown(false);
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="logo-content">
                    <img className="logo1" src={logo1} alt="Logo" />
                </div>

                <div className="logo-body">
                    <h1>
                        {mode === "signup"
                            ? "SIGN UP"
                            : mode === "forgot"
                                ? "FORGOT PASSWORD"
                                : mode === "verify"
                                    ? "VERIFY ACCOUNT"
                                    : "SIGN IN"}
                    </h1>

                    <p>
                        {mode === "signup"
                            ? "Enter your email and password to register"
                            : mode === "forgot"
                                ? "Enter your email to reset your password"
                                : mode === "verify"
                                    ? "We've sent a 6-digit code to your email"
                                    : "Enter your email and password to login"}
                    </p>

                    <form className="form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                                {error}
                            </div>
                        )}

                        {mode === "signup" && (
                            <div className="input1">
                                <label>Name</label>
                                <div className="input-container">
                                    <img src="/svg/user.svg" alt="..." />
                                    <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {mode !== "verify" && (
                            <div className="input1">
                                <label>Email</label>
                                <div className="input-container">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.5" d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z" fill="currentColor"></path><path d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z" fill="currentColor"></path></svg>
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {(mode === "login" || mode === "signup") && (
                            <div className="input1">
                                <label>Password</label>
                                <div className="input-container">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.5" d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z" fill="currentColor"></path><path d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z" fill="currentColor"></path><path d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z" fill="currentColor"></path><path d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z" fill="currentColor"></path><path d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z" fill="currentColor"></path></svg>
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "verify" && (
                            <>
                                <div className="input1">
                                    <div className="input-container">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path opacity="0.5" d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z" fill="currentColor"></path>
                                            <path d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z" fill="currentColor"></path>
                                            <path d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z" fill="currentColor"></path>
                                            <path d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z" fill="currentColor"></path>
                                            <path d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z" fill="currentColor"></path>
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="resend-otp mt-4">
                                    <p>
                                        Didn't receive code?{' '}
                                        <span
                                            onClick={() => {
                                                toast.success("New OTP sent to your email");
                                            }}
                                            style={{ cursor: "pointer", color: "#4C6FFF" }}
                                        >
                                            Resend OTP
                                        </span>
                                    </p>
                                </div>
                            </>
                        )}

                        {mode === "signup" && (
                            <div className="input1">
                                <label>Confirm Password</label>
                                <div className="input-container">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.5" d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z" fill="currentColor"></path><path d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z" fill="currentColor"></path><path d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z" fill="currentColor"></path><path d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z" fill="currentColor"></path><path d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z" fill="currentColor"></path></svg>
                                    <input
                                        type="password"
                                        placeholder="Enter confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                        {mode === "signup" && (
                            <div className="input1">
                                <label>Country</label>
                                <select
                                    className='selection-container'
                                    style={{ border: 'none' }}
                                    value={selectedCountry}
                                    onChange={(e) => {
                                        const country = countries.find(c => c.cca2 === e.target.value);
                                        if (country) {
                                            setSelectedCountry(e.target.value);
                                            setCountryCode(country.callingCodes[0] || "");

                                            // THIS IS THE KEY FIX - Update formData to sync with phone field
                                            setFormData(prev => ({
                                                ...prev,
                                                country: country.name.common,
                                                countryCode: country.callingCodes[0] || ""
                                            }));
                                            setCountry(country.name.common);
                                        }
                                    }}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.cca2} value={country.cca2}>
                                            {country.name.common}  
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {mode === "signup" && (
                            <div className="input1">
                                <label>Mobile</label>
                                <div className="input-container" style={{ background: '#121E32', display: 'flex', alignItems: 'center' }}>
                                    <Dropdown show={showCountryDropdown} onToggle={(isOpen) => setShowCountryDropdown(isOpen)}>
                                        <Dropdown.Toggle
                                            variant="light"
                                            id="dropdown-country-code"
                                            className="country-code-dropdown"
                                            style={{
                                                width: '120px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                background: '#121E32',
                                                borderColor: '#ced4da',
                                                borderRight: 'none',
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0,
                                                color: 'white'
                                            }}
                                        >
                                            {loadingCountries ? (
                                                "Loading..."
                                            ) : (
                                                <>
                                                    {formData.country &&
                                                        countries.find(c => c.name.common === formData.country) && (
                                                            <img
                                                                src={countries.find(c => c.name.common === formData.country)?.flag}
                                                                alt="country flag"
                                                                style={{ width: '20px', height: 'auto', marginRight: '5px' }}
                                                            />
                                                        )
                                                    }
                                                    +{formData.countryCode}
                                                </>
                                            )}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflow: 'auto' }}>
                                            {countries.map((country) => (
                                                <Dropdown.Item
                                                    key={country.cca2}
                                                    onClick={() => handleCountrySelect(country)}
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                >
                                                    <span className="flag-icon me-2">
                                                        <img
                                                            src={country.flag}
                                                            alt={`${country.name.common} flag`}
                                                            style={{ width: '24px', height: 'auto', marginRight: '5px', marginLeft: '8px' }}
                                                        />
                                                    </span>
                                                    <span style={{ marginRight: '8px' }}>+{country.callingCodes[0]}</span>
                                                    <span>{country.name.common}</span>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{
                                            flex: 1,
                                            border: 'none',
                                            background: '#121E32',
                                            color: 'white',
                                            padding: '8px 12px',
                                            borderTopRightRadius: '4px',
                                            borderBottomRightRadius: '4px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "login" && (
                            <h3
                                onClick={() => {
                                    console.log("Forgot Password Clicked");
                                    setMode("forgot");
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                FORGOT PASSWORD
                            </h3>
                        )}

                        <button
                            type="submit"
                            disabled={mode === "login" ? mutation.isPending : signupMutation.isPending}
                            style={{marginTop:'25px'}}
                        >
                            {mode === "signup"
                                ? signupMutation.isPending
                                    ? "Signing up..."
                                    : "Sign Up"
                                : mode === "forgot"
                                    ? "Submit"
                                    : mode === "verify"
                                        ? "Submit"
                                        : mutation.isPending
                                            ? "Signing in..."
                                            : "Sign In"}
                        </button>

                        {(mode === "login" || mode === "signup") && (
                            <div className="or-container">
                                <div className="line"></div>
                                <span className="or-text">OR</span>
                                <div className="line"></div>
                            </div>
                        )}

                        <div className="bottom-content">
                            {(mode === "login" || mode === "signup") && (
                                <p>
                                    {mode === "signup"
                                        ? "Already have an account? "
                                        : "Don't have an account? "}
                                    <span
                                        onClick={() => {
                                            console.log("Sign Up/Sign In Toggled");
                                            setMode(mode === "signup" ? "login" : "signup");
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {mode === "signup" ? "SIGN IN" : "SIGN UP"}
                                    </span>
                                </p>
                            )}

                            {mode === "login" && (
                                <h4 style={{ cursor: "pointer" }}>
                                    Account Not Verified? <span onClick={() => {
                                        console.log("Verify Clicked");
                                        setMode("verify");
                                    }}>Verify</span>
                                </h4>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;