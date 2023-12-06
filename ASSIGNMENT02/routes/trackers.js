var express = require("express");
var router = express.Router();
const Tracker = require('../models/tracker');

router.get('/', async (req, res, next) => {
    try {
        const trackers = await Tracker.find().exec();
        res.render('trackers/index', {
            title: "Tracker",
            dataset: trackers
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/add', (req,res,next) => {
    res.render('trackers/add', {title: "Add new day track"})
});

router.post('/add', (req, res, next) => {
    const { breakfast, lunch, dinner, distanceRan, date } = req.body;

    const newTrack = new Tracker({
        breakfast: breakfast.trim(),
        lunch: lunch.trim(),
        dinner: dinner.trim(),
        distanceRan: Number(distanceRan),
        date
    });

    newTrack.save()
        .then(() => {
            res.redirect('/trackers');
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get('/delete/:_id', async (req, res, next) => {
    let trackerId = req.params._id;

    try{
        const deletedTracker = await Tracker.findByIdAndDelete(trackerId);
        res.redirect('/trackers');

    }

    catch (err) {
        console.log(err)
    }
})







router.get('/edit/:_id', async (req, res, next) => {
  try {
    const trackerId = req.params._id;
    const tracker = await Tracker.findById(trackerId).exec();


    res.render('trackers/edit', {
      title: "Edit Day Track",
      tracker: tracker
    });
  } catch (err) {
    console.error(err);
  }
});


router.post('/edit/:_id', async (req, res, next) => {
  try {
    const trackerId = req.params._id;
    const { breakfast, lunch, dinner, distanceRan, date } = req.body;

    const updatedTracker = await Tracker.findByIdAndUpdate(trackerId, {
      breakfast: breakfast.trim(),
      lunch: lunch.trim(),
      dinner: dinner.trim(),
      distanceRan: distanceRan,
      date
    }, { new: true });

    res.redirect('/trackers'); 
  } catch (err) {
    console.error(err);
  }
});



module.exports = router;
