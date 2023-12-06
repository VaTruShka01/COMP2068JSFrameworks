var express = require("express");
var router = express.Router();
const Tracker = require('../models/tracker');



// add reusable middleware function to inject it in our handlers below that need authorization
function IsLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

router.get('/', async (req, res, next) => {
    try {
        const trackers = await Tracker.find().exec();
        res.render('trackers/index', {
            title: "Tracker",
            dataset: trackers,
            user: req.user
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/add', IsLoggedIn, (req,res,next) => {
    res.render('trackers/add', {title: "Add new day track", user: req.user})
});

router.post('/add', IsLoggedIn, (req, res, next) => {
    const { breakfast, lunch, dinner, distanceRan, date, caloriesAte } = req.body;

    const newTrack = new Tracker({
        breakfast: breakfast.trim(),
        lunch: lunch.trim(),
        dinner: dinner.trim(),
        distanceRan: distanceRan,
        date,
        caloriesAte
    });

    newTrack.save()
        .then(() => {
            res.redirect('/trackers');
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get('/delete/:_id', IsLoggedIn, async (req, res, next) => {
    let trackerId = req.params._id;

    try{
        const deletedTracker = await Tracker.findByIdAndDelete(trackerId);
        res.redirect('/trackers');

    }

    catch (err) {
        console.log(err)
    }
})







router.get('/edit/:_id', IsLoggedIn, async (req, res, next) => {
  try {
    const trackerId = req.params._id;
    const tracker = await Tracker.findById(trackerId).exec();


    res.render('trackers/edit', {
      title: "Edit Day Track",
      tracker: tracker,
      user: req.user
    });
  } catch (err) {
    console.error(err);
  }
});


router.post('/edit/:_id', async (req, res, next) => {
  try {
    const trackerId = req.params._id;
    const { breakfast, lunch, dinner, distanceRan, date, caloriesAte } = req.body;

    const updatedTracker = await Tracker.findByIdAndUpdate(trackerId, {
      breakfast: breakfast.trim(),
      lunch: lunch.trim(),
      dinner: dinner.trim(),
      distanceRan: distanceRan,
      date,
      caloriesAte
    }, { new: true });

    res.redirect('/trackers'); 
  } catch (err) {
    console.error(err);
  }
});



module.exports = router;
