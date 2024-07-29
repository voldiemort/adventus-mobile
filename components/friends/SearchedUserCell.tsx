import { Link } from "expo-router";
import ProfileDisplay from "../ui/profileDisplay";
import { SearchedUserDetails } from "@/lib/types/userTypes";

const SearchedUserCell = ({ id, name, image }: SearchedUserDetails) => {
    return (
        <Link push href={`/user/${id}`}>
            <ProfileDisplay name={name} image={image ?? ''}/>
        </Link>
    ) 
}

export default SearchedUserCell