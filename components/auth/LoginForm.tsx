import { View, TextInput, Alert } from "react-native"
import { Button } from "../ui/button"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm, Controller } from "react-hook-form"
import React from "react"


export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = handleSubmit((data) => console.log(data));


  return (
    <View className="w-3/4 gap-4">
      <Controller
        control={control}
        rules={{
          required: 'Required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="email">Email</Label>
                <Input
                    placeholder="Your email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="email"
                    className='border-2 rounded-lg my-[5px]'
                />
                {errors.email && <Text className="text-destructive">{errors.email.message}</Text>}
            </View>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
            required: 'Required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="password">Password</Label>
                <Input
                    placeholder="Your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="password"
                    className='border-2 rounded-lg my-[5px]'
                    secureTextEntry={true}
                />
                {errors.password && <Text className="text-destructive">{errors.password.message}</Text>}
            </View>
        )}
        name="password"
      />

        <Button onPress={onSubmit}>
            <Text>Sign in with email</Text>
        </Button>
    </View>
  )
}