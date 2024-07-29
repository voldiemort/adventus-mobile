import { getToken } from "@/lib/authActions";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Status } from "./sendFriendRequestButtonGroup";

const SendFriendRequestButton = ({ id, isSecret, setStatus }: { id: string, isSecret: boolean, setStatus: Dispatch<SetStateAction<Status>> }) => {
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

    return (
        <Button className='w-full' onPress={onClick}>
            <Text>{isSecret ? 'Send anonymous friend request' : 'Send friend request'}</Text>
        </Button>
    )
}

export default SendFriendRequestButton;