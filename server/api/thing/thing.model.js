'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  dateFrom: Date,
  dateTo: Date,
  totalDays: Number,
  mail: String,
  state: { type: Boolean, default: false }, 
});

export default mongoose.model('Thing', ThingSchema);
