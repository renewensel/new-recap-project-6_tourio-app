// pages/api/places/[id].js
import dbConnect from "./../../../../db/connect";
import Place from "./../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "GET") {
    try {
      // Fetch a specific place by ID
      const place = await Place.findById(id);
      response.status(200).json(place);
    } catch (error) {
      response.status(404).json({ error: "Place not found" });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedPlaceData = request.body;

      // Update the place by ID using the $set operator for partial updates
      await Place.findByIdAndUpdate(id, { $set: updatedPlaceData });

      response.status(200).json({ status: "Place updated" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
