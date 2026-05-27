import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Comment, Post, User } from "@/types";

export default function Posts({ post, comments, user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    

    return(
        <>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p>By {user.name}</p>
            <p className="mt-5">{post.body}</p>
            <h2 className="text-3xl font-bold mt-5">Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{ post: Post, comments: Comment[], user: User }> = async (context) => {
    try {
        const { id } = context.params!;

        const postRes = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const commentRes = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

        const [post, comments] = await Promise.all([
            postRes.then(res => res.json()),
            commentRes.then(res => res.json()),
        ])

        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        const user = await userRes.json();

        return { props: { post, comments, user } }
    } catch (err) {
        return { notFound: true}
    }
}