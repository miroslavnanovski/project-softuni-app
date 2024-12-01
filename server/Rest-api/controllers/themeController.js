const { themeModel } = require('../models');
const { newPost } = require('./postController')

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
  
    console.log(`Request to delete theme: ${themeId}, by user: ${userId}`);
  
    themeModel
      .findOneAndDelete({ _id: themeId, userId })
      .then((deletedTheme) => {
        if (!deletedTheme) {
          console.warn('Unauthorized attempt to delete theme');
          return res.status(401).json({ message: 'Not allowed!' });
        }
  
        console.log('Theme deleted:', deletedTheme);
  
        // Proceed to delete related posts
        return postModel.deleteMany({ themeId }).then(() => {
          console.log('Related posts deleted successfully');
          return res.status(200).json({
            message: 'Theme and related posts deleted successfully!',
          });
        });
      })
      .catch((err) => {
        console.error('Error during deleteTheme:', err);
        return res.status(500).json({
          message: 'Internal Server Error',
          error: err.message || 'Unexpected error',
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
