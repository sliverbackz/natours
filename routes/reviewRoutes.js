const express = require('express');
const reviewController = require('../controllers/reviewController');
const authorController = require('../controllers/authController');

// mergeParams true means merging / and /:tourId for nested routes
const router = express.Router({ mergeParams: true });

router.use(authorController.protect);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authorController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authorController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authorController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
