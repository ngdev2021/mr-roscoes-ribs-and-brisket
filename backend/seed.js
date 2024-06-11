const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem'); // Adjust the path if needed

const menuItems = [
    { name: 'Smoked Ribs', description: 'Delicious smoked ribs', price: 15.99, category: 'Meats', image: 'https://www.spendwithpennies.com/wp-content/uploads/2022/06/Oven-Baked-Ribs-SpendWithPennies-4.jpg' },
    { name: 'Smoked Brisket', description: 'Tender brisket with BBQ sauce', price: 18.99, category: 'Meats', image: 'https://blog.thermoworks.com/wp-content/uploads/2023/03/21_Firecracker-Brisket_Thermapen-ONE_Signals_352_compressed.jpg' },
    { name: 'Smoked Chicken', description: 'Juicy BBQ chicken', price: 12.99, category: 'Meats', image: 'https://www.chilesandsmoke.com/wp-content/uploads/2022/09/Smoked-Chicken-Drumstick_Featured.jpg' },
    { name: 'Pulled Pork', description: 'Slow-cooked pulled pork', price: 13.99, category: 'Meats', image: 'https://www.recipetineats.com/wp-content/uploads/2019/11/Close-up-of-pulled-pork-with-BBQ-Sauce.jpg' },
    { name: 'Smoked Sausage', description: 'Spicy smoked sausage', price: 14.99, category: 'Meats', image: 'https://assets.bonappetit.com/photos/655bdad5f899ab14ec05fb81/1:1/w_3855,h_3855,c_limit/Untitled-1.jpg' },
    { name: 'Smoked Turkey Legs', description: 'Smoked turkey Leg', price: 16.99, category: 'Meats', image: 'https://cdn.shopify.com/s/files/1/0391/9501/files/IMG_0075_480x480.jpg' },
    { name: 'Burnt Ends', description: 'Crispy burnt ends', price: 17.99, category: 'Meats', image: 'https://overthefirecooking.com/wp-content/uploads/2021/08/E_IMG_6812-2-scaled.jpg' },
    { name: 'Brisket Mac and Cheese', description: 'Creamy mac and cheese', price: 6.99, category: 'Sides', image: 'https://www.greatgrubdelicioustreats.com/wp-content/uploads/2022/02/BrisketMacandCheese_03.jpg' },
    { name: 'Jalapeno Cheddar Honey Butter Cornbread', description: 'Sweet cornbread muffin', price: 2.99, category: 'Sides', image: 'https://theninjacue.com/wp-content/uploads/2023/01/IMG_9443-2.jpg' },
    { name: 'Cole Slaw', description: 'Tangy cole slaw', price: 3.99, category: 'Sides', image: 'https://assets.bonappetit.com/photos/647f450e29083daa1eff589e/1:1/w_2560%2Cc_limit/20230524-SEO-RECIPES-BON-APP24155.jpg' },
    { name: 'Potato Salad', description: 'Classic potato salad', price: 3.99, category: 'Sides', image: 'https://blackpeoplesrecipes.com/wp-content/uploads/2023/05/Southern-Potato-Salad-11326.jpg' },
    { name: 'Baked Beans', description: 'Smoky baked beans', price: 3.99, category: 'Sides', image: 'https://www.thechunkychef.com/wp-content/uploads/2015/06/Baked-Beans-2-1.jpg' },
    { name: 'Collard Greens', description: 'Southern-style collard greens', price: 3.99, category: 'Sides', image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1456,h_1092/k%2F2023-06-smoked-turkey-collard-greens%2Fsmoked-turkey-neck-collard-greens-341-horizontal' },
    { name: 'Banana Pudding', description: 'Creamy banana pudding', price: 4.99, category: 'Desserts', image: 'https://www.allrecipes.com/thmb/_qOkqpTBO85JOIjNNqehF0V_JuY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/22749-the-best-banana-pudding-mfs-367-3c684cb51f6d4cc08b3a7aa4e926083c.jpg' },
    { name: 'Peach Cobbler', description: 'Sweet peach cobbler', price: 4.99, category: 'Desserts', image: 'https://sallysbakingaddiction.com/wp-content/uploads/2016/08/delicious-peach-cobbler.jpg' },
    { name: 'Sweet Tea', description: 'Classic sweet tea', price: 2.99, category: 'Beverages', image: 'https://www.allrecipes.com/thmb/REETjYFdVRmMtwVHPT66VmQVmmI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/109190-smooth-sweet-tea-DDMFS-4x3-9e849a386d414cb2b852099f02b6782d.jpg' },
    { name: 'Lemonade', description: 'Refreshing lemonade', price: 2.99, category: 'Beverages', image: 'https://www.allrecipes.com/thmb/-sGgcEhnlIhqr0legC4Q7TPkRhU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/32385-best-lemonade-ever-DDMFS-4x3-8cef7761205e417499c89eb178e5ba2b.jpg' },
    { name: 'Beer', description: 'Cold beer', price: 4.99, category: 'Beverages', image: 'https://www.eatingwell.com/thmb/AdUlkswyOCpPaEEQkkDmYbPW5XM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/does-beer-expire-2000-2bc4cb2e8f9b4947b14e13d41a14d999.jpg' },
    { name: 'Wine', description: 'Red or white wine', price: 6.99, category: 'Beverages', image: 'https://bravofarms.com/cdn/shop/products/red-wine_1200x.jpg?v=1646253890' },
    { name: 'Soda', description: 'Coke, Diet Coke, Sprite', price: 1.99, category: 'Beverages', image: 'https://m.media-amazon.com/images/I/91iFMPtXsIL.jpg' },
  ];
      

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    // Clear existing menu items
    await MenuItem.deleteMany({});
    // Insert sample menu items
    await MenuItem.insertMany(menuItems);
    console.log('Sample menu items inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
