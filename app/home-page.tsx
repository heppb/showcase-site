'use client'

import DiscogResponse from "./models/DiscogResponse";

 
// This is a Client Component (same as components in the `pages` directory)
// It receives data as props, has access to state and effects, and is
// prerendered on the server during the initial page load.
export default function HomePage({ data }: {data : DiscogResponse}){
      return {
        props: {
          records: data.releases,
        },
      };
    }