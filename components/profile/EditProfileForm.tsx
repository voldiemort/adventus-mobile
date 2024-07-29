import { View, TextInput, Alert } from "react-native"
import { Button } from "../ui/button"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm, Controller } from "react-hook-form"
import React from "react"
import { router } from "expo-router"
import { UserDetails } from "@/lib/types/userTypes"
import { Textarea } from "../ui/textarea"

export default function EditProfileForm({ userDetails }: { userDetails: UserDetails }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userDetails.name,
      bio: userDetails.bio ?? '',
      birthday: userDetails.birthday?.substring(0, 10) ?? '',
      timetableUrl: userDetails.timetableUrl ?? '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
    } catch (error) {
      console.error((error as Error).message);
      return;
    }
  });


  return (
    <View className="w-3/4 gap-4">
      <Controller
        control={control}
        rules={{
          required: 'Required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="name">Your name</Label>
                <Input
                    placeholder="Your name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="name"
                    className='border-2 rounded-lg my-[5px]'
                />
                {errors.name && <Text className="text-destructive">{errors.name.message}</Text>}
            </View>
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="bio">Bio</Label>
                <Textarea
                    placeholder="Write something that you want other people to know about you!"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="bio"
                    className='border-2 rounded-lg my-[5px]'
                />
                {errors.bio && <Text className="text-destructive">{errors.bio.message}</Text>}
            </View>
        )}
        name="bio"
      />

      <Controller
        control={control}
        rules={{
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="birthday">Your birthday</Label>
                <Input
                    placeholder="Your birthday"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="birthday"
                    className='border-2 rounded-lg my-[5px]'
                />
                {errors.birthday && <Text className="text-destructive">{errors.birthday.message}</Text>}
            </View>
        )}
        name="birthday"
      />

      <Controller
        control={control}
        rules={{
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="timetableUrl">Your NUSMods timetable URL</Label>
                <Textarea
                    placeholder="e.g. https://nusmods.com/timetable/sem-1/share?xxx"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="bio"
                    className='border-2 rounded-lg my-[5px]'
                />
                {errors.timetableUrl && <Text className="text-destructive">{errors.timetableUrl.message}</Text>}
            </View>
        )}
        name="timetableUrl"
      />

        <Button className='bg-[#2563ebe5]' onPress={onSubmit}>
            <Text>Save changes</Text>
        </Button>
    </View>
  )
}