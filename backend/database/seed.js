import { db, User, Post, Comment, Rating } from "./model.js";

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

await Post.create({
    locationName: "House1",
    description: "This is user1's house",
    userId: 1
});

await Post.create({
    locationName: "House2",
    description: "This is user2's house",
    userId: 2
});

await Comment.create({
    text: "This is comment 1",
    postId: 1,
    userId: 1
});

await Comment.create({
    text: "This is comment 2",
    postId: 1,
    userId: 2
});

await Rating.create({
    enjoyability: 95,
    popularity: 18
});

await Rating.create({
    enjoyability: 55,
    popularity: 12
});

await db.close();