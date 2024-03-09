//handles signup
const handleRegister = async (e) => {
    try {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        const email = e.target.elements.email.value.trim();
        const mobile = e.target.elements.mobile.value.trim();
        const password = e.target.elements.password.value.trim();
        const confirmPassword = e.target.elements.cPassword.value.trim();

        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
        const mobileRegex = /^(?![0-5])\d{10}$/;
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

        // Check if any field is empty
        if (!name || !mobile || !email || !password) {
            toast("error", "All fields should be filled","left");
        } else if (!name.match(nameRegex)) {
            toast("error", "Name cannot contain consecutive spaces","left");
        } else if (!mobile.match(mobileRegex)) {
            toast("error", "Enter a valid mobile number","left");
        } else if (!email.match(emailRegex)) {
            toast("error", "Invalid email address","left");
        } else if (!password.match(passwordRegex)) {
            toast(
                "error",
                "Password must be at least 6 characters and contain at least one special character","left"
            );
        } else if (password !== confirmPassword) {
            toast("error", "Password do not match","left");
        } else {
            const data = await fetchData("POST", "/register", {
                name,
                email,
                password,
                mobile,
            });
            if (data.status === "success") {
                location.href = "/";
            }
        }
    } catch (error) {
        toast("error", error.message,"left");
        console.log(error);
    }
};

//handles login
const handleLogin = async (e) => {
    try {
        e.preventDefault();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value.trim();
        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
        if (!email || !password) {
            toast("error", "All fields should be filled","left");
        } else if (!email.match(emailRegex)) {
            toast("error", "Invalid email address","left");
        } 
        // else if (!password.match(passwordRegex)) {
        //     toast(
        //         "error",
        //         "Password must be at least 6 characters and contain at least one special character","left"
        //     );
        // } 
        else {
            const formData = new FormData(e.target);
            const data = await fetchData("POST", "/login", { email, password });
            if (data.status === "success") {
                location.href = "/";
            }
        }
    } catch (error) {
        toast("error", error.message,"left");
    }
};

document
    .querySelector("#registerForm")
    ?.addEventListener("submit", handleRegister);
document.querySelector("#loginForm")?.addEventListener("submit", handleLogin);
