import { Request, Response, NextFunction } from "express";

import Tour from "../infrastructure/schemas/Tour";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

// const tours = [{
//     _id: "1",
//     image:"https://media.istockphoto.com/id/803613236/photo/sigiriya-rock-sri-lanka.jpg?a=1&s=612x612&w=0&k=20&c=BTJp77OjGw8eRzouO0dnLCmcpSv4eKsRKNorJgbajXg=",
//     name:"Tour 1",
//     location:"Sigiriya",
//     price:"200",
//   },
//   {
//     _id: "2",
//     image:"https://media.istockphoto.com/id/506156125/photo/temple-of-the-sacred-tooth-relic-kandy.jpg?a=1&s=612x612&w=0&k=20&c=AqGjimwy_hrB37BrU2bzipN8VHpsfY3kgnnxkw_4ZOo=",
//     name:"Tour 2",
//     location:"Kandy",
//     price:"100",
//   },
//   {
//     _id: "3",
//     image:"https://media.istockphoto.com/id/876457358/photo/african-bush-elephant-in-kruger-national-park-south-africa.webp?a=1&s=2048x2048&w=0&k=20&c=f7aSWQu-pu7K4fTA0cJ32M_-_G9zpbHMdmMVK1-3_AU=",
//     name:"Tour 3",
//     location:"Yala National Park",
//     price:"400",
//   },
//   {
//     _id: "4",
//     image:"https://media.istockphoto.com/id/1200413230/photo/surfer-girl-of-african-decent-walking-towards-sea-with-surfboard.webp?a=1&s=2048x2048&w=0&k=20&c=ARK7E4fVc3fFkFMQzgjItpqxujRbTF7uivK0LyEPpNM=",
//     name:"Tour 4",
//     location:"Mirissa",
//     price:"300",
//   },
//   {
//     _id: "5",
//     image:"https://media.istockphoto.com/id/1216110075/photo/train-arriving-at-famous-nine-arch-bridge-in-ella-sri-lanka.webp?a=1&s=2048x2048&w=0&k=20&c=NK28KV-SnUlwbAOZN9nSHEe6dlacSIuiYj0PmMBd1IE=",
//     name:"Tour 5",
//     location:"Ella",
//     price:"600",
//   },
//   {
//     _id: "6",
//     image:"https://media.istockphoto.com/id/467073646/photo/jump-humpback-whale-madagascar.webp?a=1&s=2048x2048&w=0&k=20&c=6SFYY50-cYm4Jq2ojyAvLLo9_RYuHLhdEeH6HnL1tqo=",
//     name:"Tour 6",
//     location:"Whale Watching",
//     price:"300",
//   },
//   {
//     _id: "7",
//     image:"https://media.istockphoto.com/id/888267492/photo/pinnawala-elephant-orphanage-sri-lanka.webp?a=1&s=2048x2048&w=0&k=20&c=VzgIhe-wqLVr63C0fWXj0LfTqBWzLtQ-vJfElBW1pqI=",
//     name:"Tour 7",
//     location:"Udawalawe National Park",
//     price:"400",
//   },
//   {
//     _id: "8",
//     image:"https://media.istockphoto.com/id/1077504370/photo/place-of-interest-galle-fort-in-sri-lanka-the-beacon-on-a-bastion-utrecht-and-church.webp?a=1&s=2048x2048&w=0&k=20&c=5uwJ4LFCVT_8VaZ8CFeAsYdG5FEpL05SuDfvj58mjFw=",
//     name:"Tour 8",
//     location:"Galle",
//     price:"200",
//   }
// ]; 
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllTours = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const tours = await Tour.find();
    await sleep(500); // Simulate a delay of 1 second
    res.status(200).json(tours);
    return;
  } catch (error) {
    next(error); // Pass the error to the global error handling middleware
  } 
};

export const getTourByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
      return;
    } else {
      throw new NotFoundError("Tour not found");
    }
  } catch (error) {
    next(error); // Pass the error to the global error handling middleware
  } 
};

export const createTour = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const tour = req.body;
    //Validate request data
    if (!tour.name || !tour.image || !tour.description || !tour.subImage_1 || !tour.subImage_2 || !tour.subImage_3) {
    throw new ValidationError("Invalid tour data");
    }
  //Create new tour
  await Tour.create({
    name: tour.name,
    image: tour.image,
    description: tour.description,
    subImage_1: tour.subImage_1,
    subImage_2: tour.subImage_2,
    subImage_3: tour.subImage_3,
  });

  res.status(201).send();
  return;
  } catch (error) {
    next(error); // Pass the error to the global error handling middleware
  } 
};

export const deleteTour =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourId = req.params.tourId;
    await Tour.findByIdAndDelete(tourId);

    res.status(200).send();
    return;
  } catch (error) {
    next(error); // Pass the error to the global error handling middleware
  } 
};

export const updateTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourId = req.params.tourId;
    const updatedTour = req.body;

    //Validate request data
    if (
      !updatedTour.name ||
      !updatedTour.image ||
      !updatedTour.description ||
      !updatedTour.subImage_1 ||
      !updatedTour.subImage_2 ||
      !updatedTour.subImage_3
    ) {
      throw new ValidationError("Invalid tour data");
    }

    await Tour.findByIdAndUpdate(tourId, updatedTour);

    res.status(200).send();
    return;
  } catch (error) {
    next(error); // Pass the error to the global error handling middleware
  } 
}