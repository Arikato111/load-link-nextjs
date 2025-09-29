import { useRouter } from "next/router"

export default function Links() {
    const router = useRouter();
    const { username } = router.query;
    return (
        <div>
            <h1>{username}'s links</h1>
            <hr />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus aut at, esse ex a quibusdam rem nobis sed porro repudiandae laudantium exercitationem ullam necessitatibus neque aliquid dolore possimus voluptatem?
            <hr />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus aut at, esse ex a quibusdam rem nobis sed porro repudiandae laudantium exercitationem ullam necessitatibus neque aliquid dolore possimus voluptatem?
            <hr />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus aut at, esse ex a quibusdam rem nobis sed porro repudiandae laudantium exercitationem ullam necessitatibus neque aliquid dolore possimus voluptatem?
            <hr />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus aut at, esse ex a quibusdam rem nobis sed porro repudiandae laudantium exercitationem ullam necessitatibus neque aliquid dolore possimus voluptatem?
            <hr />
        </div>
    )
}