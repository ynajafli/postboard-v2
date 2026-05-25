import { useFetch } from "@/hooks/useFetch";
import type { Post } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const {data, isLoading, error} = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = (currentPage * PAGE_SIZE)
  const visiblePosts = data ? data.slice(startIndex, endIndex) : [];

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }


  return (
    <>
      <h1 className="text-4xl">Postboard v2</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <p className="justify-self-end">Page {currentPage}/{totalPages}</p>
          <ul>
            {visiblePosts.map(post => <li key={post.id}><Link href={`posts/${post.id}`}>{post.title}</Link></li>)}
          </ul>
          <div>
            <button className="mr-5 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer w-25" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer w-25" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </>
  );
}
