import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({post}) => {
  console.log(post);
  return (
    <FlatList 
        data={post}
        keyExtractor={(item)=> item.title}
        renderItem={({item})=>(
            <Text className='text-sm text-white'>{item.title}</Text>
        )}
        horizontal
    />
  )
}

export default Trending