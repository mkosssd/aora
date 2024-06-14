import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/button'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const signup = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();

	const [form, setForm] = useState({
    	username: '',
		email: '',
		password: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const signupHandler = async() => {
		if(!form.email || !form.password || !form.username){
			Alert.alert('Error', 'Please fill all in the fields')
			return
		}
		setIsSubmitting(true)
		try {
			const result = await createUser(form)
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
					<Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
					<Text className='text-lg font-psemibold text-white mt-4'>Sign up to Aora</Text>
					<FormField title= 'Username' value={form.username} handleChangeText={(e)=>setForm({...form,username: e})} otherStyles="mt-8"/>
					<FormField title= 'Email' value={form.email} handleChangeText={(e)=>setForm({...form,email: e})} otherStyles="mt-5" keyboardType="email-address"/>
					<FormField title= 'Password' value={form.password} handleChangeText={(e)=>setForm({...form,password: e})} otherStyles="mt-5" />
					<CustomButton title='Sign Up' handlePress={signupHandler} containerStyles="mt-7" isLoading={isSubmitting}/>
					<View className='pt-5 w-100 justify-center flex-row'>
						<Text className='text-lg text-gray-100 font-pregular'>Have an account? </Text>
						<Link href="/signin" className='text-lg font-psemibold text-secondary'>Sign In</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default signup

const styles = StyleSheet.create({})