import { View } from 'react-native'
import { Text } from '../ui/text'
import { UserDetails } from '@/lib/types/userTypes'
import ProfileDisplay from '../ui/profileDisplay'
import SendFriendRequestButtonGroup from './sendFriendRequestButtonGroup'

export default function PrivateProfile({ id, userDetails }: { id: string, userDetails: UserDetails }) {
    return (
        <View className='flex-1 flex-col items-center justify-center'>
            <ProfileDisplay name={userDetails.name} image=''/>
            <SendFriendRequestButtonGroup id={id}/>
        </View>
    )
}
