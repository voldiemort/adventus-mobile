import { View, TextInput, Alert } from "react-native"
import { Button } from "../ui/button"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm, Controller } from "react-hook-form"
import React from "react"
import { apiLogin } from "@/lib/authActions"
import { Link, Redirect, router } from "expo-router"
import { Separator } from "../ui/separator"


export default function LoginForm() {
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
  const onSubmit = handleSubmit(async (data) => {
    try {
      await apiLogin(data);
      router.replace('/(tabs)')
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

        <Button className='bg-[#2563ebe5]' onPress={onSubmit}>
            <Text>Sign in with email</Text>
        </Button>

        <Separator className="w-full"/>
        <Text className="text-[#828282] self-center text-center">
          If you don't have an account, <Link push href='/signup' className="text-black">sign up here.</Link>
        </Text>
    </View>
  )
}