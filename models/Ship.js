// Ship model

const mongoose = require('mongoose')
const { Schema } = mongoose

const shipSchema = new Schema({
  ship: {
    // ship type
    type: String,
    required: true
  },

  name: {
    // name player gave the ship
    type: String,
    required: true
  },

  sprite: {
    // ship sprite
    _value: {
      type: String,
      required: true
    },
    frameRate: Number,
    frameTime: Number,
    frameDelay: Number,
    rewind: Boolean
  },

  attributes: {
    'category': { type: String, required: true },
    '"cost"': { type: Number, required: true },
    '"automaton"': { type: Boolean, default: false },
    '"shields"': { type: Number, required: true },
    '"hull"': { type: Number, required: true },
    '"required crew"': { type: Number, required: true },
    '"bunks"': { type: Number, required: true },
    '"mass"': { type: Number, required: true },
    '"drag"': { type: Number, required: true },
    '"heat dissipation"': { type: Number, required: true },
    '"fuel capacity"': { type: Number, required: true },
    '"cargo space"': { type: Number, required: true },
    '"outfit space"': { type: Number, required: true },
    '"weapon capacity"': { type: Number, required: true },
    '"engine capacity"': { type: Number, required: true },
    '"energy capacity"': { type: Number, required: true },
    '"energy generation"': { type: Number, default: 0 },
    '"shield generation"': { type: Number, default: 0 },
    '"shield energy"': { type: Number, default: 0 },
    '"hull repair rate"': { type: Number, default: 0 },
    '"hull energy"': { type: Number, default: 0 },
    '"heat generation"': { type: Number, default: 0 },
    '"ramscoop"': { type: Number, default: 0 },
    weapon: {
      'blast radius': { type: Number, default: 80 },
      'shield damage': { type: Number, default: 800 },
      'hull damage': { type: Number, default: 400 },
      'hit force': { type: Number, default: 1200 }
    }
  },

  outfits: Schema.Types.Mixed, // outfits object - outfit: amount

  engine: [{ // array of engine cordinates
    type: String
  }],

  gun: [{ // array of gun cordinates & gun name
    type: String
  }],

  turret: [{ // array of turret cordinates & turret name
    type: String
  }],

  explode: [{ // array of explosion names & value
    type: String
  }],

  'final explode': {
    type: String,
    default: 'final explosion medium'
  }
})

const Ship = mongoose.model('Ship', shipSchema)

module.exports = Ship
