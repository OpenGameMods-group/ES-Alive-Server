// shipLevel.js - calculate fleet / ship level

const calcFleetLevel = (shipsArr) => {

}

const calcShipLevel = (ship) => {
  const {
    '"shields"': shields,
    '"hull"': hull,
    '"outfit space"': outfitSpace,
    '"weapon capacity"': weaponCap,
    '"engine capacity"': engineCap
  } = ship.attributes

  const level = (+shields + +hull + +outfitSpace + +weaponCap + +engineCap) / 1690 >> 0

  return +level || 0
}

module.exports = {
  calcFleetLevel,
  calcShipLevel
}
