import { SearchedUserDetails } from "@/lib/types/userTypes"
import SearchedUserCell from "./SearchedUserCell"
import { Separator } from "../ui/separator";
import { View } from "react-native";
import { Text } from "../ui/text";

const SearchedUsersList = ({ users } : { users: SearchedUserDetails[] }) => {
    return (
        <View className="flex flex-col">
            <Separator className="w-full"/>
            <Text className="p-[6px] font-semibold">
                Search Results
            </Text>
            {users.map((user, index) => {
                return (<SearchedUserCell key={index} id={user.id} name={user.name} image={user.image}/>)
            })}
        </View>
    )
}

export default SearchedUsersList;