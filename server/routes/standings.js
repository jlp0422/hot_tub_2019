const app = require("express").Router()
const { msfTwo, asyncMiddleware } = require("../utils.js")

app.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const regularSeason = await msfTwo.getData(
      "nfl",
      "2018-regular", // change to 2019
      "seasonal_standings",
      "json",
      { stats: "W", force: true }
    )
    const playoffs = await msfTwo.getData(
      "nfl",
      "2019-playoff", // change to 2020
      "seasonal_games",
      "json",
      { force: true }
    )
    res.send({ regularSeason, playoffs: {} })
  })
)

module.exports = app
