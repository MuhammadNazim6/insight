const Vision = require("../models/visionModel.js");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");



const createVision = asyncHandler(async (req, res) => {
  let { title, content } = req.body;
  const userId = req.session.userId;
  title = title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();

  const newVision = await Vision.create({
    userId,
    title,
    content,
  })
  if (newVision) {
    res.json({ message: "Succesfully created new vision", status: 'success', vision: newVision });
  } else {
    throw new Error("Failed to create new vision");
  }
});



const upvoteVision = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { visionId } = req.body;
  if (!userId) {
    return res.json({ message: 'Not a valid userId' })
  }

  //check upvoted or not
  const isUpvoted = await Vision.exists({
    _id: visionId,
    'upvotes.userId': userId
  })
  if (isUpvoted) {
    //remove upvote
    const removedUpvote = await Vision.findByIdAndUpdate(
      visionId,
      { $pull: { upvotes: { userId } } },
      { new: true }
    )

    if (removedUpvote) {
      res.json({ status: 'success', message: 'Upvote Removed', count: removedUpvote.upvotes.length })
    } else {
      res.json({ status: 'failed', message: 'Unable to remove upvote' })
    }

  } else {
    //to add upvote
    const addedUpvote = await Vision.findByIdAndUpdate(
      visionId,
      { $push: { upvotes: { userId } } },
      { new: true }
    );
    if (addedUpvote) {
      res.json({ status: 'success', message: 'Upvote Added', count: addedUpvote.upvotes.length })
    } else {
      res.json({ status: 'failed', message: 'Unable to add upvote' })
    }
  }
})


const interestInVision = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { visionId } = req.body;
  if (!userId) {
    return res.json({ message: 'Not a valid userId' })
  } 

  //check already interested or not
  const isInterested = await Vision.exists({
    _id: visionId,
    'interested.userId': userId
  })
  if (isInterested) {
    //remove interest
    const removedInterest = await Vision.findByIdAndUpdate(
      visionId,
      { $pull: { interested: { userId } } },
      { new: true }
    )

    if (removedInterest) {

      // removing notification from the pitched users notification 
      const pitchedUserId = removedInterest.userId;
      console.log(pitchedUserId,'pitchedUserId');
      let pitchedUser = await User.findById(pitchedUserId)

      console.log(pitchedUser,' pitchedUser');

      pitchedUser.notifications = pitchedUser.notifications.filter((notif)=>notif.userId.equals(userId))
      console.log(pitchedUser,'kjgfkghfhgfjhgjhg');
      await pitchedUser.save()
      console.log("Removed notification");

      res.json({ status: 'success', message: 'Interest Removed', count: removedInterest.interested.length })
    } else {
      res.json({ status: 'failed', message: 'Unable to remove interest' })
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
      const pitchedUser = await User.findById(pitchedUserId)

      // adding notification as object by giving visionId and userId (who added interest)
      pitchedUser.notifications.push({
        userId,
        visionId
      })

      await pitchedUser.save()  //saving notification added to pitched user
      console.log('After saving pitched user notification array : ',pitchedUser);

      res.json({ status: 'success', message: 'Interest Added', count: addedInterest.interested.length })
    } else {
      res.json({ status: 'failed', message: 'Unable to add interest' })
    }
  }
})


module.exports = {
  createVision,
  upvoteVision,
  interestInVision,
};