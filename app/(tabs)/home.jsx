import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/trending'
import EmptyState from '../../components/emptyState'
import { getAllPosts } from '../../lib/appwrite'

const Home = () => {
   const [refreshing, setRefreshing] = useState(false)
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   useEffect(() => {
   const fetchData = async() => {
	setIsLoading(true)
	try {
		const response = await getAllPosts()
		setData(response)
	} catch (error) {
		Alert.alert('Error', error.message)
	}finally{
		setIsLoading(false)
	}
   }
   fetchData()
   }, [])
   const onRefresh = async() =>{
	setRefreshing(true)
	// refresh video
	setRefreshing(false)
   }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={[
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text className='text-3xl text-white'>{item.id}</Text>}
		ListHeaderComponent={()=>(
			<View className='my-6 px-4 space-y-6'>
				<View className='justify-between items-start flex-row mb-6'>
					<View>
						<Text className='font-pmedium text-sm text-gray-100'>Welcome Back!</Text>
						<Text className='text-2xl font-semibold text-white'>Manas</Text>
					</View>
					<View className='mt-1.5'>
						<Image source={images.logoSmall} className='h-10 w-9' resizeMode='contain'/>
					</View>
				</View>
				<SearchInput/>
				<View className='w-full flex-1 pt-5 pb-8'>
					<Text className='text-gray-100 font-pregular mb-3 text-lg'>Latest Videos</Text>
					<Trending post={data}/>
				</View>
			</View>
		)}
		ListEmptyComponent={()=>(
			<EmptyState title='No Videos Found' subtitle='Be the first one to upload a video.'/>
		)}
		refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})
