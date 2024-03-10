const Vision = require("../models/visionModel.js");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { sendInterestNotification } = require("./keepAliveController.js");

const createVision = asyncHandler(async (req, res) => {
    let { title, content } = req.body;
    const userId = req.session.userId;
    title =
        title.trim().charAt(0).toUpperCase() +
        title.trim().slice(1).toLowerCase();

    const newVision = await Vision.create({
        userId,
        title,
        content,
    });
    if (newVision) {
        res.status(200).json({
            message: "Succesfully created new vision",
            status: "success",
            vision: newVision,
        });
    } else {
        throw new Error("Failed to create new vision");
    }
});

const upvoteVision = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    const { visionId } = req.body;
    if (!userId) {
        return res.json({ message: "Not a valid userId" });
    }

    //check upvoted or not
    const isUpvoted = await Vision.exists({
        _id: visionId,
        "upvotes.userId": userId,
    });
    if (isUpvoted) {
        //remove upvote
        const removedUpvote = await Vision.findByIdAndUpdate(
            visionId,
            { $pull: { upvotes: { userId } } },
            { new: true }
        );

        if (removedUpvote) {
            res.status(200).json({
                status: "success",
                message: "Upvote Removed",
                count: removedUpvote.upvotes.length,
            });
        } else {
            res.json({ status: "failed", message: "Unable to remove upvote" });
        }
    } else {
        //to add upvote
        const addedUpvote = await Vision.findByIdAndUpdate(
            visionId,
            { $push: { upvotes: { userId } } },
            { new: true }
        );
        if (addedUpvote) {
            res.status(200).json({
                status: "success",
                message: "Upvote Added",
                count: addedUpvote.upvotes.length,
            });
        } else {
            res.json({ status: "failed", message: "Unable to add upvote" });
        }
    }
});

// for marking interested and removing it , also adding & removing notifications
const interestInVision = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    const { visionId } = req.body;
    if (!userId) {
        return res.json({ message: "Not a valid userId" });
    }

    //check already interested or not
    const isInterested = await Vision.exists({
        _id: visionId,
        "interested.userId": userId,
    });
    if (isInterested) {
        //remove interest
        const removedInterest = await Vision.findByIdAndUpdate(
            visionId,
            { $pull: { interested: { userId } } },
            { new: true }
        );

        if (removedInterest) {
            // removing notification from the pitched users notification
            const pitchedUserId = removedInterest.userId;

            let pitchedUser = await User.findById(pitchedUserId);

            pitchedUser.notifications = pitchedUser.notifications.filter(
                (notif) => !notif.userId.equals(userId)
            );

            await pitchedUser.save();
            console.log("Removed notification");

            res.status(200).json({
                status: "success",
                message: "Interest Removed",
                count: removedInterest.interested.length,
            });
        } else {
            res.json({
                status: "failed",
                message: "Unable to remove interest",
            });
        }
    } else {
        //to add interest
        const addedInterest = await Vision.findByIdAndUpdate(
            visionId,
            { $push: { interested: { userId } } },
            { new: true }
        );
        if (addedInterest) {
            //Adding notification to the users notification array
            const pitchedUserId = addedInterest.userId;
            const pitchedUser = await User.findById(pitchedUserId);

            // adding notification as object by giving visionId and userId (who added interest)
            pitchedUser.notifications.push({
                userId,
                visionId,
            });

            await pitchedUser.save(); //saving notification added to pitched user
            console.log("Notification saved");

            res.status(200).json({
                status: "success",
                message: "Interest Added",
                count: addedInterest.interested.length,
            });
            const user = await User.findById(userId);

            await sendInterestNotification(addedInterest.userId, {
                type: "notification",
                message: `${user.name} showed interest in your idea`,
            });
        } else {
            res.json({ status: "failed", message: "Unable to add interest" });
        }
    }
});

// adding comments in the vision
const addComment = asyncHandler(async (req, res) => {
    const { visionId, comment } = req.body;
    const vision = await Vision.findById(visionId);

    if (vision) {
        vision.comments.push({
            userId: req.session.userId,
            comment,
        });
        const user = await User.findById(req.session.userId, {
            name: 1,
            profile: 1,
            _id: 0,
        });
        console.log(user);
        const commentAdded = await vision.save();
        if (commentAdded) {
            res.json({
                status: "success",
                message: "Comment added successfully",
                comment: comment,
                updatedAt: new Date(),
                user,
            });
        } else {
            throw new Error("Failed to add comment");
        }
    } else {
        throw new Error("Failed to add comment"); 
    }
});

const deleteVision = asyncHandler(async (req, res) => {
    const { visionId } = req.body;
    const deletedVision = await Vision.findByIdAndDelete(visionId);
    if (deletedVision) {
        res.status(204).json({
            status: "success",
            message: "Deleted vision succesfully",
        });
    } else {
        throw new Error("Unable to delete vision");
    }
});

const editVision = asyncHandler(async (req, res) => {
    const { visionId, title, content } = req.body;
    const vision = await Vision.findById(visionId);
    vision.title = title || vision.title;
    vision.content = content || vision.content;

    const editedVision = await vision.save();
    if (editedVision) {
        res.status(200).json({
            status: "success",
            message: "Vision edited successfully",
        });
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    const { visionId, commentId } = req.body;
    const vision = await Vision.findById(visionId);

    vision.comments = vision.comments.filter(
        (comment) => !comment._id.equals(commentId)
    );
    const commentDeleted = await vision.save();

    if (commentDeleted) {
        res.status(200).json({
            status: "success",
            message: "Comment deleted successfully",
        });
    } else {
        res.status(400).json({
            status: "failed",
            message: "Unable to delete comment at this instance",
        });
    }
});

module.exports = {
    createVision,
    upvoteVision,
    interestInVision,
    addComment,
    deleteVision,
    deleteComment,
    editVision,
};
