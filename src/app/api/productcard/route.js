import mongoose from 'mongoose';
import Product from "../../../models/lens"
import connectDB from "../../../lib/dbconection"

export async function GET(request) {
  try {
    await connectDB();
    
    // Check if we have a valid connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const frameType = searchParams.get('frameType');
    const search = searchParams.get('search');

    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (frameType) filter.frameType = frameType;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    let products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .select('name price images category brand rating numReviews')
      .lean();

    // If no products found, return sample data for testing
    if (products.length === 0) {
      products = [
        {
          _id: 'sample1',
          name: 'Classic Round Eyeglasses',
          price: 1299,
          images: ['https://via.placeholder.com/300x200?text=Glasses+1'],
          category: 'Eyeglasses',
          brand: 'Ray-Ban',
          rating: 4.5,
          numReviews: 12
        },
        {
          _id: 'sample2',
          name: 'Aviator Sunglasses',
          price: 2499,
          images: ['https://via.placeholder.com/300x200?text=Glasses+2'],
          category: 'Sunglasses',
          brand: 'Oakley',
          rating: 4.8,
          numReviews: 8
        }
      ];
    }

    const totalProducts = products.length > 0 ? await Product.countDocuments(filter) : products.length;
    const totalPages = Math.ceil(totalProducts / limit);

    return new Response(JSON.stringify({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}