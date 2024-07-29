import { View, TextInput, Alert } from "react-native"
import { Button } from "../ui/button"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm, Controller } from "react-hook-form"
import React from "react"
import { apiLogin, apiSignup } from "@/lib/authActions"
import { Redirect, router } from "expo-router"


export default function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      verifyPassword: "",
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.verifyPassword) {
        setError('verifyPassword', {message: 'Passwords do not match'}); 
    }

    try {
      await apiSignup(data);
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
                    placeholder="example@gmail.com"
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
                <Label nativeID="name">Name</Label>
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
            required: 'Required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
            }
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

      <Controller
        control={control}
        rules={{
            required: 'Required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
            }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <View>
                <Label nativeID="verifyPassword">Verify password</Label>
                <Input
                    placeholder="Re-enter password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="password"
                    className='border-2 rounded-lg my-[5px]'
                    secureTextEntry={true}
                />
                {errors.verifyPassword && <Text className="text-destructive">{errors.verifyPassword.message}</Text>}
            </View>
        )}
        name="verifyPassword"
      />

        <Button className='bg-[#2563ebe5]' onPress={onSubmit}>
            <Text>Sign up with email</Text>
        </Button>
    </View>
  )
}