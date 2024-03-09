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

const controlInterest = async (e) => {
    try {
        const visionId = e.currentTarget.dataset.visionId;
        const data = await fetchData("PATCH", "/upvote", { visionId });
        if ((data.status = "success")) {
            e.currentTarget.classList.toggle("vision-active");
        }
    } catch (error) {
        toast.error(error.message);
    }
};

document.querySelectorAll(`[data-upvote]`)?.forEach((item) => {
    item.addEventListener("click", controlUpvote);
});

document.querySelectorAll("[data-interest")?.forEach((item) => {
    item.addEventListener("submit", controlInterest);
});
