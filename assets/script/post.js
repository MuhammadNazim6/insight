const handlePostSubmit = async (e) => {
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
            addVisionToDOM();
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const addVisionToDOM = () => {
    //code to add new vision
};

const controlUpvote = async (e) => {
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("PATCH", "/upvote", { visionId });
        if ((data.status = "success")) {
            e.currentTarget.classList.toggle("upvote-active");
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const controlInterest = async (e)=>{
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("PATCH", "/upvote", { visionId });
        if ((data.status = "success")) {
            e.currentTarget.classList.toggle("vision-active");
        }
    } catch (error) {
        toast.error(error.message);
        
    }
}

document
    .querySelector("#addPostForm")
    ?.addEventListener("submit", handlePostSubmit);
document.querySelector("#upvote")?.addEventListener("click", controlUpvote);
document.querySelector("#interest")?.addEventListener("submit", controlInterest);
