//creating new vision
const handleVisionSubmit = async (e) => {
    try {
        const title = e.target.elements.title.value.trim();
        const content = e.target.elements.content.value.trim();
        if (!title || !content) {
            toast("error", "All fields should be filled");
            return;
        }
        const data = await fetchData("POST", "/create-vision", {
            title,
            content,
        });
        if (data.status === "success") {
            toast("success", data.message);
            //add vision to DOM
        }
    } catch (error) {
        toast.error(error.message);
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
            visionId
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
        if(data.status == "success"){
            toast("success",data.message)
            //remove vision from dom
        }
    } catch (error) {
        toast('error',error.message)
    }
};

const addVisionToDOM = () => {
    //code to add new vision
};

document
    .querySelector("#addPostForm")
    ?.addEventListener("submit", handlePostSubmit);
document
    .querySelector("#editVisionForm")
    ?.addEventListener("click", handleEditVision);
document.querySelector(`[data-delete-vision]`)?.forEach((item) => {
    item.addEventListener("click", deleteVision);
});
