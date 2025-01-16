"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import RetrieveAlbumsClient from "./RetrieveAlbumsClient";

export default function RetrieveAlbumsClientWrapper() {
  const searchParams = useSearchParams();
  const albumid = searchParams.get("albumID");

  if (!albumid) {
    return <div>No album ID provided</div>;
  }

  return <RetrieveAlbumsClient albumid={albumid} />;
}
