const controlUpvote = async (e) => {
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("PATCH", "/upvote", { visionId });
        if ((data.status = "success")) {
            e.target.classList.toggle("fa-regular");
            e.target.classList.toggle("fa-solid");
        }
    } catch (error) {
        toast("error", error.message);
    }
};

const controlInterest = async (e) => {
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("PATCH", "/interest", { visionId });
        if ((data.status = "success")) {
            e.target.classList.toggle("fa-regular");
            e.target.classList.toggle("fa-solid");
        }
    } catch (error) {
        toast("error", error.message);
    }
};

const commentToggle = (e) => {
    const id = e.target.dataset.commentToggle;
    const commentSec = document.querySelector(`[data-comment-div-id="${id}"]`);
    commentSec.classList.toggle("hide");
};

document.querySelectorAll(`[data-upvote]`)?.forEach((item) => {
    item.addEventListener("click", controlUpvote);
});

document.querySelectorAll(`[data-interest]`)?.forEach((item) => {
    item.addEventListener("click", controlInterest);
});
document.querySelectorAll(`[data-comment-toggle]`)?.forEach((item) => {
    item.addEventListener("click", commentToggle);
});
