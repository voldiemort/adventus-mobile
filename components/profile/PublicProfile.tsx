import { UserDetails } from "@/lib/types/userTypes";
import FriendProfile from "./FriendProfile";
import SendFriendRequestButtonGroup from "./sendFriendRequestButtonGroup";
import { View } from "react-native";

export default function PublicProfile({ id, userDetails }: { id: string, userDetails: UserDetails }) {
    return (
        <View className="flex-1 items-center justify-center">
            <FriendProfile userDetails={userDetails}/>
            <SendFriendRequestButtonGroup id={id}/>
        </View>
    ) 
}