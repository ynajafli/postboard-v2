import { useRouter } from "next/router";

export default function Posts() {
    const router = useRouter();
    const { id } = router.query;

    if (typeof id !== 'string') return <p>Loading...</p>

    return(
        <>
            <h1>post</h1>
            <p>id: {id}</p>
        </>
    );
}