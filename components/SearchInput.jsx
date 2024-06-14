import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

export default function SearchInput ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) {
  const [showPassword, setshowPassword] = useState(false)
  return (
      <View className='w-full flex-row space-x-4 h-16 px-4 bg-black-100 border rounded-2xl focus:border-secondary items-center '>
        <TextInput
          className='text-base mt-0.5 flex-1 text-white font-pregular'
          value={value}
          placeholder='Search for a video topic'
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
        />
        
        <TouchableOpacity
        onPress={() => {
            setshowPassword(!showPassword)
        }}
        >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
        </TouchableOpacity>
        
      </View>
  )
}
