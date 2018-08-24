// Ship model

const mongoose = require('mongoose')
const { Schema } = mongoose

const { calcShipLevel } = require('util/shipLevel')
const Pilot = require('models')

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

  level: {
    type: Number,
    default: 0
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

  thumbnail: {
    type: String,
    required: true
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
    '"energy capacity"': { type: Number, default: null },
    '"energy generation"': { type: Number, default: null },
    '"shield generation"': { type: Number, default: null },
    '"shield energy"': { type: Number, default: null },
    '"hull repair rate"': { type: Number, default: null },
    '"hull energy"': { type: Number, default: null },
    '"heat generation"': { type: Number, default: null },
    '"ramscoop"': { type: Number, default: null },
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
  },

  // display player info?
  description: {
    type: String
  },

  _owner: { type: Schema.Types.ObjectId, ref: 'Pilot' }
})

shipSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('attributes')) {
      return next()
    }

    // generate the ship level
    this.level = calcShipLevel(this)

    return next()
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

// shipSchema.post('save', async function (next) {

// })

// shipSchema.pre('remove', async function (next) {
//   try {
//     // find the owner of the ship
//     const owner = await Pilot.findById(this._owner)

//     // remove id of the ship from list
//     owner.pilots.remove(this.id)

//     // save player
//     await owner.save()

//     return next()
//   } catch (error) {
//     return next(error)
//   }
// })

const Ship = mongoose.model('Ship', shipSchema)

module.exports = Ship
