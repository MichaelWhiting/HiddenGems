import { db, User, Gem, Comment, Rating } from "./model.js";

await db.sync({ force: true });

// seed here
await User.create({
    email: "michael@gmail.com",
    password: "test"
});

await User.create({
    email: "josh@gmail.com",
    password: "test"
});

await User.create({
    email: "ty@gmail.com",
    password: "test"
});

await User.create({
    email: "jesse@gmail.com",
    password: "test"
});

await Gem.create({
    name: "Skiing Trail",
    description: "At this resort, this trail is not used at all and the snow is super fresh",
    lat: 10.4214,
    lng: 10.9864,
    userId: 1
});

await Gem.create({
    name: "Cool Shop",
    description: "This is a really cool shop, has some unique items",
    lat: 10.592,
    lng: 10.1005,
    userId: 2
});

await Comment.create({
    text: "This place is awesome!",
    gemId: 1,
    userId: 1
});

await Comment.create({
    text: "This place is lame...",
    gemId: 1,
    userId: 2
});

await Rating.create({
    enjoyability: 95,
    popularity: 18,
    userId: 1,
    gemId: 1
});

await Rating.create({
    enjoyability: 50,
    popularity: 25,
    userId: 2,
    gemId: 1
});

await Rating.create({
    enjoyability: 55,
    popularity: 12,
    userId: 1,
    gemId: 2
});

await Rating.create({
    enjoyability: 12,
    popularity: 50,
    userId: 2,
    gemId: 2
});

await db.close();