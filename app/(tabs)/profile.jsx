import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InfoBox from '../../components/InfoBox'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/emptyState'
import Loader from '../../components/loader'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getUserPosts, signOut } from '../../lib/appwrite'



const Profile = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [userPost, setUserPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { query } = useLocalSearchParams()
  const { user, setUser, setIsLoggedIn } = useGlobalContext()

  const logout = async() => {
		await signOut()
		setUser(null)
		setIsLoggedIn(false)
		router.replace('/signin')
	}

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true)
      try {
        const response = await getUserPosts(user.$id)
        setUserPost(response)
      } catch (error) {
        // Alert.alert('Error', error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserPosts()
  }, [user])
  return (
    <SafeAreaView className='bg-primary h-full'>
      {!isLoading && !!user ? (
        <FlatList
          data={userPost}
          keyExtractor={item => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
			<View className='w-full justify-center items-center mt-6 mb-12 px-4'>
				<TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
					<Image source={icons.logout}  resizeMethod='contain' className='w-6 h-6'/>
				</TouchableOpacity>
				<View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
					<Image source={{uri: user.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover'/>
				</View>
					<InfoBox title={user.username} containerStyles='mt-5' titleStyles="text-lg"/>
				<View className='mt-5 flex-row'>
					<InfoBox title={userPost.length || 0} subtitle="Posts" containerStyles='mr-10' titleStyles="text-xl"/>
					<InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl"/>
				</View>
			</View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='No Videos Found'
              subtitle='No videos found for this query.'
            />
          )}
        />
      ) : (
		<Loader />
      )}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
