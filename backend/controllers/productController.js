import productModel from '../models/productModel.js'

const getAllProducts = async (req,res) => {
    try{
        const products = await productModel.find();
        res.status(200).json({success:true,products});
    }catch(error){
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message, 
    });
    }
}

const demoProducts = [
    {
      name: 'Product 1',
      slug: 'product-1',
      image: 'https://via.placeholder.com/150',
      images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
      brand: 'Brand A',
      category: 'Category A',
      description: 'Description for Product 1',
      price: 100,
      countInStock: 10,
      rating: 4.5,
      numReviews: 5,
      reviews: [
        {
          name: 'User 1',
          comment: 'Great product!',
          rating: 5,
        },
        {
          name: 'User 2',
          comment: 'Good product.',
          rating: 4,
        },
      ],
    },
    {
      name: 'Product 2',
      slug: 'product-2',
      image: 'https://via.placeholder.com/150',
      images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
      brand: 'Brand B',
      category: 'Category B',
      description: 'Description for Product 2',
      price: 200,
      countInStock: 20,
      rating: 4.0,
      numReviews: 4,
      reviews: [
        {
          name: 'User 3',
          comment: 'Awesome product!',
          rating: 5,
        },
        {
          name: 'User 4',
          comment: 'Nice product.',
          rating: 4,
        },
      ],
    },
  ];


const addProducts = async (req,res) => {
    try{


        const createdProducts = await productModel.insertMany(demoProducts);
        res.status(201).json(createdProducts);
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export {getAllProducts,addProducts};