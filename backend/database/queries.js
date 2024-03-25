import {User, Gem, Comment } from "./model.js"

const userId = 2; 

User.findOne({
    where:{userId: userId},
  include: [{ model: Gem }, { model: Comment }]
})
  .then(user => {
    if (!user) {
      console.log('User not found');
      return;
    }
    
    
    console.log('User:', user.email);
    console.log('Gems:', user.gems); 
    console.log(user.gems.map((gem) => gem.name))
    console.log('Comments:', user.comments); 
  })
  .catch(error => {
    console.error('Error retrieving user:', error);
  });

