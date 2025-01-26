
// import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/dbconnect';
import Creator from '@/lib/models/creater';
import User from '@/lib/models/user';
// import { ICreator } from '@/lib/interface/creater';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  origin: '*', // Replace '' with your frontend domain in production
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(req:Request, res:Response, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}


  export const POST = async(req: Request)=> {
await connectDB();
    try {
        const data = await req.json();
      

      const newPost = new Creator({
        solAdd: data.solAdd,
        title: data.title,
        description: data.description,
        label: data.label,
        amount: data.amount,
        icons: data.icons,
        end: data.end,
        users: [],
      });

      await newPost.save();

      return Response.json({ message: 'Post created successfully', data: newPost });
    } catch (error) {
        return Response.json({ message: 'Internal Server Error', error });
    }
}

export const PUT = async(req: Request, res:Response)=> {
    await connectDB();
    await runMiddleware(req, res, cors);
    try {
        const data = await req.json();

        const { id, igProfile, views } = data;

        const updatedPost = await User.findByIdAndUpdate(id, { igProfile, views }, { new: true });

        return Response.json({ message: 'Post updated successfully', data: updatedPost }); } catch (error) {
        return Response.json({ message: 'Internal Server Error', error });
    }
}