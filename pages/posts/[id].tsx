import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post, User } from "@/types";
import { useFetch } from "@/hooks/useFetch";

export default function Posts({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    

    return(
        <>
            <h1 className="text-4xl font-bold">{post.title}</h1>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{ post: Post}> = async (context) => {
    const { id } = context.params!;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    const post = await res.json();
    return { props: { post } }
}