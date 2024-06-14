import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/button'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const signin = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const signInHandler = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all in the fields')
      return
    }
    setIsSubmitting(true)
    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser()
      setUser(result)
	  setIsLoggedIn(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-lg font-psemibold text-white mt-4'>
            Login in to Aora
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign In'
            handlePress={signInHandler}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='pt-5 w-100 justify-center flex-row'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?{' '}
            </Text>
            <Link
              href='/signup'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signin

const styles = StyleSheet.create({})
