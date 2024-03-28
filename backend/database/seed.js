import { db, User, Gem, Comment, Rating, Tag } from "./model.js";

await db.sync({ force: true });

const defaultColors = {
    navbarColor: "#0dcaf0",
    backgroundColor: "#E0FAFF",
    foregroundColor: "#FFFFFF"
}
// seed here
await User.create({
    ...defaultColors,
    firstName: "Michael",
    lastName: "Whiting",
    email: "michael@gmail.com",
    password: "test"
});

await User.create({
    ...defaultColors,
    firstName: "Josh",
    lastName: "Lara",
    email: "josh@gmail.com",
    password: "test"
});

await User.create({
    ...defaultColors,
    firstName: "Ty",
    lastName: "Cannon",
    email: "ty@gmail.com",
    password: "test"
});

await User.create({
    ...defaultColors,
    firstName: "Jesse",
    lastName: "Garlick",
    email: "jesse@gmail.com",
    password: "test"
});

await Gem.create({
    name: "Skiing Trail",
    description: "At this resort, this trail is not used at all and the snow is super fresh",
    lat: -50.4214,
    lng: 10.9864,
    userId: 1,
    imgUrl: "https://libreshot.com/wp-content/uploads/2018/10/spring-landscape-1536x968.jpg"
});

await Gem.create({
    name: "Cool Shop",
    description: "This is a really cool shop, has some unique items",
    lat: 25.592,
    lng: 10.1005,
    userId: 2,
    imgUrl: "https://libreshot.com/wp-content/uploads/2018/10/spring-landscape-1536x968.jpg"
});

await Gem.create({
    name: "Comedy Club",
    description: "This comedy club is a hidden gem!",
    lat: 54.323,
    lng: 15.92872,
    userId: 3,
    imgUrl: "https://libreshot.com/wp-content/uploads/2018/10/spring-landscape-1536x968.jpg"
});

await Gem.create({
    name: "Crystal Cave",
    description: "This is a beautiful cave that no one knows about!",
    lat: 32.198,
    lng: 12.996,
    userId: 4,
    imgUrl: "https://libreshot.com/wp-content/uploads/2018/10/spring-landscape-1536x968.jpg"
});

await Gem.create({
    name: "DevMountain",
    description: "Coding bootcamp.",
    lat: 40.42082717117126, 
    lng: -111.87613180911558,
    userId: 2,
    imgUrl: "https://libreshot.com/wp-content/uploads/2018/10/spring-landscape-1536x968.jpg"
})

await Comment.create({
    text: "This place is awesome!",
    gemId: 1,
    userId: 1,
    
});

await Comment.create({
    text: "This place is lame...",
    gemId: 1,
    userId: 2
});

await Comment.create({
    text: "This place is super lame...",
    gemId: 2,
    userId: 3
});

await Comment.create({
    text: "This place is really awesome!",
    gemId: 2,
    userId: 4
});

// await Rating.create({
//     enjoyability: 95,
//     popularity: 18,
//     userId: 1,
//     gemId: 1
// });

// await Rating.create({
//     enjoyability: 50,
//     popularity: 25,
//     userId: 2,
//     gemId: 1
// });

// await Rating.create({
//     enjoyability: 55,
//     popularity: 12,
//     userId: 4,
//     gemId: 2
// });

// await Rating.create({
//     enjoyability: 12,
//     popularity: 50,
//     userId: 4,
//     gemId: 2
// });

await Tag.create({
    tagName: 'food'
});
await Tag.create({
    tagName: 'adventure'
});
await Tag.create({
    tagName: 'entertainment',
});
await Tag.create({
    tagName: 'technology',
});
await Tag.create({
    tagName: 'travel',
});
await Tag.create({
    tagName: 'education',
});
await Tag.create({
    tagName: 'health',
});
await Tag.create({
    tagName: 'fashion',
});
await Tag.create({
    tagName: 'fitness',
});
await Tag.create({
    tagName: 'pet',
});
await Tag.create({
    tagName: 'family',
});
await Tag.create({
    tagName: 'arts',
});

    
    





await db.close();