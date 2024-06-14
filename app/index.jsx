import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/button'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {
	const {isLoading, isLoggedIn} = useGlobalContext()
	if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView contentContainerStyle={{height:'100%'}}>
				<View className=' items-center min-h-[85vh] justify-center h-full px-4'>
					<Image source={images.logo} className='w-[130px] h-[85px]' resizeMode='contain'/>
					<Image source={images.cards} className=' max-w-[380px] max-h-[300px]' resizeMode='contain'/>
					<View className='relative mt-5'>
						<Text className='text-3xl font-bold text-center text-white'>       
						Discover Endless{"\n"} Possibilities with{" "} 
						<Text className='text-secondary-200'>Aora</Text></Text>
						<Image source={images.path} className='w-[135px] absolute h-[15px] -bottom-2 -right-10' resizeMode='contain'/>
					</View>
					<Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless
					Exploration with Aora</Text>
					<CustomButton title='Continue With Email' handlePress={()=>{router.push('/signin')}} containerStyles="w-full mt-7"/>
				</View> 
			</ScrollView>
			<StatusBar backgroundColor='#161622' style='light'/> 
		</SafeAreaView>
		
	)
}