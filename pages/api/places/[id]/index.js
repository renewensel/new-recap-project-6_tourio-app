// pages/api/places/[id].js
import dbConnect from "./../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    // Use findById to find a single document by its _id
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    const comments = place.comments || [];

    response.status(200).json({ place, comments });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
