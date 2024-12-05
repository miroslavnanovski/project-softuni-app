
const { newPost } = require('./postController')
const { postModel, themeModel, userModel } = require('../models');

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

function deleteTheme(req, res, next) {
  const { themeId } = req.params;
  const { _id: userId } = req.user;

  console.log(`Received request to delete theme with ID: ${themeId} by user: ${userId}`);

  themeModel
    .findOneAndDelete({ _id: themeId, userId })
    .then((deletedTheme) => {
      if (!deletedTheme) {
        console.warn(`Unauthorized attempt to delete theme: ${themeId}`);
        return res.status(401).json({ message: 'Not allowed!' });
      }

      console.log('Theme deleted successfully:', deletedTheme);

      // Delete related posts using deleteMany
      return postModel
        .deleteMany({ themeId }) // Deletes all posts with the given themeId
        .then((result) => {
          console.log(`Deleted ${result.deletedCount} posts related to theme: ${themeId}`);
          res.status(200).json({ message: 'Theme and related posts deleted successfully!' });
        })
        .catch((err) => {
          console.error('Error deleting related posts:', err);
          res.status(500).json({
            message: 'Error deleting related posts',
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.error('Error deleting theme:', err);
      res.status(500).json({
        message: 'Error deleting theme',
        error: err.message,
      });
    });
}


  

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    deleteTheme
}
