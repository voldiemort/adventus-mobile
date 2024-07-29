import SendFriendRequestButton from "./sendFriendRequestButton";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

export enum Status {
    unsent,
    sending,
    sent
}

const SendFriendRequestButtonGroup = ({ id }: { id: string }) => {
    const [status, setStatus] = useState<Status>(Status.unsent);

    if (status === Status.sending) {
        return (
            <Text>Sending...</Text>
        )
    }
    if (status === Status.sent) {
        return (
            <Text>Sent!</Text>
        )
    }

    return (
        <View className="flex-col w-full items-center justify-center">
            <SendFriendRequestButton id={id} isSecret={false} setStatus={setStatus}/>
            <SendFriendRequestButton id={id} isSecret={true} setStatus={setStatus}/>
        </View>
    )
}

export default SendFriendRequestButtonGroup