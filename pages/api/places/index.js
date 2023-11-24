import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    console.log("places: ", places);
    return response.status(200).json(places);
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;

      // Create a new place in the database
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: "Failed to create place" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
