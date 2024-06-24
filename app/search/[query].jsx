import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/emptyState'
import { images } from '../../constants'
import { searchPosts } from '../../lib/appwrite'
import Loader from '../../components/loader'

const Search = () => {
	 const [refreshing, setRefreshing] = useState(false)
	 const [searchPost, setSearchPost] = useState([])
	 const [isLoading, setIsLoading] = useState(true)
	const {query} = useLocalSearchParams()

	 useEffect(() => {
	 const getSearchPost = async() => {
		setIsLoading(true)
		try {
			const response = await searchPosts(query)
			setSearchPost(response)
		} catch (error) {
			Alert.alert('Error', error.message)
		}finally{
			setIsLoading(false)
		}
	 }
	 getSearchPost()
	 }, [query])
	return (
		<SafeAreaView className='bg-primary h-full'>
			{!isLoading ? <FlatList
				data={searchPost}
				keyExtractor={(item) => item.$id} 
				renderItem={({ item }) => <VideoCard video={item}/>}
		ListHeaderComponent={()=>(
			<View className='my-6 px-4 space-y-6'>
				<View className='justify-between items-start flex-row mb-6'>
					<View>
						<Text className='font-pmedium text-sm text-gray-100'>Search results</Text>
						<Text className='text-2xl font-semibold text-white'>{query}</Text>
					</View>
					<View className='mt-1.5'>
						<Image source={images.logoSmall} className='h-10 w-9' resizeMode='contain'/>
					</View>
				</View>
				<SearchInput searchQuery={query}/>
			</View>
		)}
		ListEmptyComponent={()=>(
			<EmptyState title='No Videos Found' subtitle='No videos found for this query.'/>
		)}/> : <Loader/>}
		</SafeAreaView>
	)
}

export default Search

const styles = StyleSheet.create({})
