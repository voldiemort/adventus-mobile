import { View } from 'react-native'
import { Text } from '../ui/text'
import { UserDetails } from '@/lib/types/userTypes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function FriendProfile({ userDetails }: { userDetails: UserDetails }) {
    return (
        <View className='flex-1 flex-col items-center justify-center'>
            <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
            <View className='flex flex-row justify-left items-center'>
                <Avatar alt={`${userDetails.name}'s Avatar`}>
                    <AvatarImage source={{ uri: userDetails.image ?? ''}}/>
                    <AvatarFallback>
                        <Text>{userDetails.name[0]}</Text>
                    </AvatarFallback>
                </Avatar>
                <Text>{userDetails.name}</Text>
            </View>

            <Text>
                {userDetails.bio}
            </Text>

            <Text>
                {userDetails.birthday}
            </Text>
       </View>
    )
}