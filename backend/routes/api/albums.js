// Imports
const router = require('express').Router();
const { Photo, User, Album } = require("../../db/models");
// const { singleMulterUpload, singlePublicFileUpload} = require('../../awsS3');

//Albums for users profile page
router.get('/user/:id(\\d+)', async (req, res) => {
  // getting userId
  // req.params.id grabs the id from the url
  const id = parseInt(req.params.id, 10);
  
  // Find all photos the belong to that user
  const userAlbums = await Album.findAll({
    where: {
        userId: id
    },
    include: Photo
  });
  // console.log("***************************************", userAlbums);
  // Passing the Array to the store in the frontend
  return res.json(userAlbums);
});

// Individual albums page
router.get('/:id(\\d+)', async (req, res) => {
    // extract the albumId
    const albumId = parseInt(req.params.id,10);

    // Find all albums in backend
    const singleAlbum = await Album.findByPk(albumId, {
        include: Photo
    })

    // Passing the Array to the store in the frontend
    return res.json(singleAlbum);
});


// Exports
module.exports = router;