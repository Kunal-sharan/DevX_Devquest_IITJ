"use client";
import Link from "next/link";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState({ query: "" });

  
  return (
    <Link href="/Search_page">
      <input
        type="text"
        name="query"
        className="input input-bordered bg-white"
        value="Search here"
        readOnly
      />
    </Link>
  );
}
