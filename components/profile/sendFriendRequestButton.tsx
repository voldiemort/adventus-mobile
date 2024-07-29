import { getToken } from "@/lib/authActions";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

enum Status {
    unsent,
    sending,
    sent
}

const sendFriendRequestButton = ({ id, isSecret, status, setStatus }: { id: string, isSecret: boolean, status: Status, 
    setStatus: Dispatch<SetStateAction<Status>> }) => {
    async function onClick() {
        setStatus(Status.sending);
        const token = await getToken();
        if (!token) {
            console.error('User not logged in');
            router.push('/login');
            return;
        }
        try {
            await axios.post(`${API_URL}/api/v1/friends/send`, {
                recipientId: id,
                isSecret: isSecret,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(token)
                }
            });
            setStatus(Status.sent);
        } catch (error) {
            console.error(error);
        }
    }

    if (status === Status.sending) {
        return <Text>Sending friend request...</Text>
    }

    if (status === Status.sent) {
        return <Text>Friend request sent!</Text>
    }

    return (
        <Button onPress={onClick}>
            <Text>{isSecret ? 'Send friend request' : 'Send anonymous friend request'}</Text>
        </Button>
    )
}

export default sendFriendRequestButton;