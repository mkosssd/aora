import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
import { router, usePathname } from 'expo-router'

export default function SearchInput ({searchQuery}) {
	const pathName = usePathname()
	const [query, setQuery] = useState(searchQuery|| '')
	return (
			<View className='w-full flex-row space-x-4 h-16 px-4 bg-black-100 border rounded-2xl focus:border-secondary items-center '>
				<TextInput
					className='text-base mt-0.5 flex-1 text-white font-pregular'
					value={query}
					placeholder='Search for a video topic'
					placeholderTextColor='#CDCDE0'
					onChangeText={(e)=>setQuery(e)}
				/>
				
				<TouchableOpacity
				onPress={() => {
					if(!query){
						 Alert.alert('Missing Query!', 'Please enter a query.')
						 return
					}
					if(pathName.startsWith('/search')) router.setParams({query})
						else router.push(`/search/${query}`)
				}}
				>
				<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
				</TouchableOpacity>
				
			</View>
	)
}
