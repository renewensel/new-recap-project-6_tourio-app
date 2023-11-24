// pages/create.js

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export default function CreatePlacePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const { data: places } = useSWR("/api/places", fetcher);

  async function addPlace(place) {
    try {
      // Make a POST request to the API route to add a new place
      await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      // Refetch the places after successful creation
      mutate("/api/places");

      // Redirect to the homepage
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Failed to add place. Please try again.");
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
      {error && <p>{error}</p>}
    </>
  );
}
