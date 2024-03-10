//creating new vision
const handleVisionSubmit = async (title, content) => {
    try {
        title = title.trim();
        content = content.trim();
        if (!title || !content) {
            toast("error", "All fields should be filled");
            return false;
        }
        const data = await fetchData("POST", "/create-vision", {
            title,
            content,
        });
        if (data.status === "success") {
            toast("success", data.message);
            const pitchContainer = document.querySelector(
                `[data-pitch-container]`
            );
            const newPitch = addVisionToDOM(data.vision);
            pitchContainer.insertBefore(newPitch, pitchContainer.firstChild);
            return true;
        }
    } catch (error) {
        toast("error", error.message);
    }
};

//editing vision
const handleEditVision = async (e) => {
    try {
        const title = e.target.elements.title.value.trim();
        const content = e.target.elements.content.value.trim();
        const visionId = e.target.elements.visionId.value;
        if (!title || !content) {
            toast("error", "All fields should be filled");
            return;
        }
        const data = await fetchData("PUT", "/edit-vision", {
            title,
            content,
            visionId,
        });
        if (data.status === "success") {
            toast("success", data.message);
            //edit vision present in DOM
        }
    } catch (error) {
        toast.error(error.message);
    }
};

//deleting vision
const deleteVision = async (e) => {
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("DELETE", "/delete-vision", { visionId });
        if (data.status == "success") {
            toast("success", data.message);
            //remove vision from dom
        }
    } catch (error) {
        toast("error", error.message);
    }
};

const addVisionToDOM = (vision) => {
    const date = new Date(vision.createdAt);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const div = document.createElement("div");
    div.setAttribute("class", "col-12 col-lg-10 col-xl-10 container-post mb-3");
    div.innerHTML = `<div class="row d-flex align-items-start" data-aos="fade-right">
                        <div class="col-12 col-lg-10">
                            <h2 class="h3 mt-3">
                                ${vision.title}
                            </h2>
                            <p class="text-secondary">
                                ${vision.content}
                            </p>
                            <div class="user-info d-flex align-items-center mb-3"
                                style="font-size: 14px">
                                <div>
                                    <span class="ms-2 text-muted post-date">Posted on ${formattedDate}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between"
                            style="width: 100%">
                            <div class="d-flex align-items-center">
                                <div >
                                    <i class="fa-regular fa-thumbs-up"></i>
                                    <span class="ml-2" style="font-size: 14px">Upvote</span>
                                </div>
                                <div >
                                    <i class="fa-regular fa-comment pointer"
                                        style="margin-left: 20px"></i>
                                    <span class="ml-2" style="font-size: 14px">Comment</span>
                                </div>
                            </div>
                            <div class="" style="margin-left: 100px">
                                <i class="fa-regular fa-handshake"></i>
                                <span class="ml-2" style="font-size: 14px">Interested</span>
                            </div>
                        </div>
                    </div>`;
    return div;
};

const handleProfileEdit = async (profile, name, mobile, bio) => {
    try {
        const mobileRegex = /^(?![0-5])\d{10}$/;
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;
        if (!name) {
            toast("error", "Name can't be empty");
            return false;
        }
        if (!mobile) {
            toast("error", "Mobile number can't be empty");
            return false;
        }
        if (!name.match(nameRegex)) {
            toast("error", "Name cannot contain consecutive spaces");
            return false;
        }
        if (!mobile.match(mobileRegex)) {
            toast("error", "Enter a valid mobile number");
            return false;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", mobile);
        formData.append("bio", bio);
        formData.append("profile", profile);
        const data = await fetchData("PUT", "/profile", formData, "multipart");
        if (data.status === "success") {
            toast("success", data.message);
            document.getElementById('namePara').textContent = data.userData.name
            document.getElementById('bioPara').textContent = data.userData.bio
            document.getElementById('mobilePara').textContent = data.userData.mobile
            document.getElementById('profileImg').src = data.userData.profile
            document.getElementById("bioPara").textContent = data.userData.bio;
            document.getElementById("mobilePara").textContent =
                data.userData.mobile;
            document.getElementById("profileImg").src = data.userData.profile;
            return true;
        }
    } catch (error) {
        toast("error", error.message);
        return false;
    }
};


document
    .querySelector("#editVisionForm")
    ?.addEventListener("click", handleEditVision);
document.querySelector(`[data-delete-vision]`)?.forEach((item) => {
    item.addEventListener("click", deleteVision);
});
