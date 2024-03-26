import {User, Gem, Comment, Tag, db } from "./model.js"

// console.log(await Tag.findAll())

// const tag1 = await Tag.findByPk(1)
// const tag2 = await Tag.findByPk(2)
// const tag3 = await Tag.findByPk(3)
// const gem1 = await Gem.findOne()

// await gem1.addTag(tag1)
// await gem1.addTag(tag2)
// await gem1.addTag(tag3)

// console.log(await Gem.findOne({ include: Tag })) 

const tag2 = await Tag.findByPk(2, {
    include: Gem
})

console.log(await Gem.findAll({ include: Tag }))

// console.log(tag2.gems)

await db.close()

