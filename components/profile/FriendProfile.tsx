import { View } from 'react-native'
import { Text } from '../ui/text'
import { UserDetails } from '@/lib/types/userTypes'
import ProfileDisplay from '../ui/profileDisplay'

export default function FriendProfile({ userDetails }: { userDetails: UserDetails }) {
    return (
        <View className='flex-initial flex-col items-center justify-center'>
            <ProfileDisplay name={userDetails.name} image={userDetails.image ?? ''}/>

            <Text>
                {userDetails.bio}
            </Text>

            <Text>
                {userDetails.birthday}
            </Text>
       </View>
    )
}