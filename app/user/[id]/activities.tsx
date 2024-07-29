import { useLocalSearchParams } from "expo-router"
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function UserActivities() {
    const { id } = useLocalSearchParams();
    return (
        <View className='flex-1 flex-col justify-center'>
            <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
            <Text>{`${id}'s activities`}</Text>
        </View>
    )
}