import { ResizeMode, Video } from 'expo-av'
import * as documentPicker from 'expo-document-picker'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/button'
import { icons } from '../../constants'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Create = () => {
	const {user} = useGlobalContext()
	const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
	title:'',
	video: null, 
	thumbnail: null,
	prompt: ''
  })
  const openPicker = async(selectType) =>{
	const result = await documentPicker.getDocumentAsync({
		type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg','image/webp','image/heif'] : ['video/mp4', 'video/gif']
	})
	if(!result.canceled){
		if(selectType === 'image'){
			setForm({...form, thumbnail: result.assets[0]})
		}
		if(selectType==='video'){
			setForm({...form, video: result.assets[0]})
		}
	}else{
		setTimeout(() => {
			Alert.alert('Document picked', JSON.stringify(result, null, 2))
		}, 100);
	}
  }
  const submitHandler = async() =>{
	if(!form.prompt || !form.thumbnail || !form.title || !form.video) {
		return Alert.alert("Please fill in all the fields.")
	}
	setUploading(true)
	try {
		await createVideo({
			...form, userId: user.$id
		})
		Alert.alert('Success', 'Post Uploaded Sucessfully')
		router.push('/home')
	}catch(error){
		Alert.alert('Error', error.message)
	}finally{
		setForm({
			title:'',
			video: null, 
			thumbnail: null,
			prompt: ''
		})
		setUploading(false)
	}
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
		<ScrollView className='px-4 my-6'>
			<Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
				<FormField title='Video title' value={form.title} placeholder='Give your video a catchy title' handleChangeText={(e) => setForm({...form,title: e})} otherStyles='mt-10'/>
				<View className='mt-7 space-y-2'>
					<Text className='text-base text-gray-100 font-pmedium'>
						Upload Video
					</Text>
					<TouchableOpacity onPress={()=>openPicker('video')}>
						{form.video ? (<Video source={{uri: form.video.uri}} className='w-full h-64 rounded-2xl' useNativeControls resizeMode={ResizeMode.COVER} isLooping/>) : 
						<View className='w-full h-40 bg-black-100 justify-center rounded-2xl items-center'>
							<View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
								<Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2'/>
							</View>
						</View>}
					</TouchableOpacity>
				</View>
				<View className='mt-7 space-y-2'>
					<Text className='text-base text-gray-100 font-pmedium'>
						Thumbnail Image
					</Text>
					<TouchableOpacity  onPress={()=>openPicker('image')}>
						{form.thumbnail ? (<Image source={{uri: form.thumbnail.uri}} className='w-full h-64 rounded-2xl' resizeMode='cover' />) : 
						<View className='w-full h-16 bg-black-100 justify-center rounded-2xl items-center border-2 border-black-200 flex-row space-x-2'>
							<Image source={icons.upload} resizeMode='contain' className='w-5 h-5'/>
							<Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
						</View>
						}
					</TouchableOpacity>
				</View>
				<FormField title='AI Prompt' value={form.prompt} placeholder='Prompt you used to create this video' handleChangeText={(e) => setForm({...form,prompt: e})} otherStyles='mt-7'/>
				<CustomButton title='Submit' handlePress={submitHandler} containerStyles='mt-7' isLoading={uploading}/>
		</ScrollView>

    </SafeAreaView>
  )
}

export default Create
