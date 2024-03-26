import {User, db, Gem, Comment, Friendship } from "./model.js"

// const userId = 2; 

// User.findOne({
//     where:{userId: userId},
//   include: [{ model: Gem }, { model: Comment }]
// })
//   .then(user => {
//     if (!user) {
//       console.log('User not found');
//       return;
//     }
    
    
//     console.log('User:', user.email);
//     console.log('Gems:', user.gems); 
//     console.log(user.gems.map((gem) => gem.name))
//     console.log('Comments:', user.comments); 
//   })
//   .catch(error => {
//     console.error('Error retrieving user:', error);
//   });

  const user1 = await User.findByPk(3);
  const user2 = await User.findByPk(4);

  await user1.addFriendship(user2);
  await user2.addFriendship(user1);


  await db.close();



  

