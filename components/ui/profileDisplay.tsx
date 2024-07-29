import { View } from "react-native"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Text } from "./text"
import { cn } from "@/lib/utils"

const ProfileDisplay = ({ className, name, image }: { className?: string, name: string, image: string }) => {
    return (
        <View className={cn('flex flex-row justify-left items-center', className)}>
            <Avatar className='mx-[5px]' alt={`${name}'s Avatar`}>
                <AvatarImage source={image === '' ? require('@/assets/images/user-avatar-default.jpg')
                    : { uri: image }
                }/>
                <AvatarFallback>
                    <Text>{name[0]}</Text>
                </AvatarFallback>
            </Avatar>
            <Text>{name}</Text>
        </View>
    )
}

export default ProfileDisplay