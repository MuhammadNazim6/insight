const Vision = require("../models/visionModel.js");
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
      res.json({ message: "Created a new vision", newVision });
  } else {
      throw new Error("Failed to create new vision");
  }
});


const upvoteVision = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { visionId } = req.body;
  console.log(userId);
  if(!userId){
      return res.json({message:'Not a valid userId'})
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
      )

      if (removedUpvote) {
          res.json({ status: 'success', message: 'Upvote Removed' })
      } else {
          res.json({ status: 'failed', message: 'Unable to remove upvote' })
      }

  } else {
      //to add upvote
      const updatedVision = await Vision.findByIdAndUpdate(
          visionId,
          { $push: { upvotes: { userId } } },
          { new: true }
      );
      if(updatedVision){
          res.json({ status: 'success', message:'Upvote Added' })
      }else{
          res.json({ status: 'failed', message:'Unable to add upvote'})
      }
  }
})

module.exports = {
  createVision,
  upvoteVision
};