//handles showing toast
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