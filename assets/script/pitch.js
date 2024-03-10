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

const commentHandler = async (e) => {
    try {
        e.preventDefault();
        const comment = e.target.elements.comment.value.trim();
        const visionId = e.target.elements.visionId.value;
        if (!comment) {
            return;
        }
        const data = await fetchData("PATCH", "/comment", {
            comment,
            visionId,
        });
        if (data.status == "success") {
            e.target.elements.comment.value = "";
            const commentSec = document.querySelector(
                `[data-comment-div-id="${visionId}"]`
            );

            commentSec.children[0].appendChild(createNewComment(data));

            commentSec.children[0].scrollTop = commentSec.children[0].scrollHeight;
        }
    } catch (error) {
        toast("error", error.message);
    }
};

const createNewComment = (data) => {
    const div = document.createElement("div");
    div.setAttribute("class", "comment d-flex align-items-start");
    div.innerHTML = `<a href="#" class="me-2">
                        <div class="comment-img-preview">
                        <img
                        src="${data.user.profile}"
                        class="rounded-circle"
                        alt="Generic placeholder image"
                        height="31"
                    />
                        </div>
                       
                    </a>
                    <div>
                        <h4 class="h6 mb-0 comment-user">${data.user.name}</h4>
                           <p>${data.comment}</p>
                    </div>`;
    return div;
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

document
    .querySelectorAll("#addCommentForm")
    ?.forEach((item) => addEventListener("submit", commentHandler));
