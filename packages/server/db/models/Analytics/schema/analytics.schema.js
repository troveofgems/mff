const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  auags: { // TODO: Anonymous Birth Year Analytics
    // The idea is that this will become a self updating array of date objects with flattened count values.
    // example : [{ "1980": 10 }, { "1993": 22 }}...]
    type: Array,
    default: []
  }
});

module.exports = AnalyticsSchema;