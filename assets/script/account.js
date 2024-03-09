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
            return true;
            //add vision to DOM
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

const addVisionToDOM = () => {
    //code to add new vision
};

const handleProfileEdit = async (profile, name, mobile, bio) => {
    try {
        if (!name || !mobile || !bio) {
            toast("error", "All fields should be filled");
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
            document.getElementById('bioPara').textContent = data.userData.bio
            document.getElementById('mobilePara').textContent = data.userData.mobile
            document.getElementById('profileImg').src = data.userData.profile
            console.log(data.userData);
            return true;
        }
    } catch (error) {
        toast("error", error.message );
        return false;
    }
};

document
    .querySelector("#editVisionForm")
    ?.addEventListener("click", handleEditVision);
document.querySelector(`[data-delete-vision]`)?.forEach((item) => {
    item.addEventListener("click", deleteVision);
});
