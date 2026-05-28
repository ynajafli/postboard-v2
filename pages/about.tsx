

export default function About() {

    return(<h1 className="text-4xl font-bold">About us</h1>);
}

export const getStaticProps = async () => {

    return {
        props: {
            builtAt: new Date().toISOString()
        }
    }
}