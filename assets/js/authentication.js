const handleRegister = async (e) => {
    try {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        const email = e.target.elements.email.value.trim();
        const mobile = e.target.elements.mobile.value.trim();
        const password = e.target.elements.password.value.trim();
        const confirmPassword = e.target.elements.cPassword.value.trim();
        const profile = e.target.elements.profile.files[0];
        const formData = new FormData(e.target);

        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
        const mobileRegex = /^(?![0-5])\d{10}$/;
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

        // Check if any field is empty
        if (!name || !mobile || !email || !password) {
            toast("error", "All fields should be filled");
        } else if (!name.match(nameRegex)) {
            toast("error", "Name cannot contain consecutive spaces");
        } else if (!mobile.match(mobileRegex)) {
            toast("error", "Enter a valid mobile number");
        } else if (!email.match(emailRegex)) {
            toast("error", "Invalid email address");
        } else if (!password.match(passwordRegex)) {
            toast(
                "error",
                "Password must be at least 6 characters and contain at least one special character"
            );
        } else if (password !== confirmPassword) {
            toast("error", "Password do not match");
        } else if (!profile) {
            toast("error", "Add a profile image");
        } else {
            const formData = new FormData(e.target);
            const data = await fetchData("POST",'/register',formData,"multipart");
        }
    } catch (error) {
        toast("error",error.message)
        console.log(error);
    }
};
const handleLogin = async (e) => {
    try {
        e.preventDefault();
        
    } catch (error) {}
};
const toast = (type, message) => {
    const color =
        type === "success"
            ? "linear-gradient(to right, #00b09b, #96c93d)"
            : "linear-gradient(90deg, rgba(215,24,40,1) 0%, rgba(158,55,50,1) 100%)";
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
        },
    }).showToast();
};



document
    .querySelector("#registerForm")
    .addEventListener("submit", handleRegister);
