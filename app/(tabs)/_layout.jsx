import { Tabs } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { icons } from '../../constants'
const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6'/>
            <Text className={`${focused ? 'font-psemibold text-[#FFA001]':'font-regular text-white'} text-xs`}>{name}</Text>
        </View>
    )
}

const TabLayout = () => {
  return (<>
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#161622",
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 84,
                
              },
        }}>
            <Tabs.Screen name="home" options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color , focused}) =>(
                    <TabIcon icon={icons.home} color={color} name="Home" focused={focused}></TabIcon>
                )
            }}/>
            <Tabs.Screen name="bookmark" options={{
                title: 'Bookmark',
                headerShown: false,
                tabBarIcon: ({color , focused}) =>(
                    <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}></TabIcon>
                )
            }}/>
            <Tabs.Screen name="create" options={{
                title: 'Create',
                headerShown: false,
                tabBarIcon: ({color , focused}) =>(
                    <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}></TabIcon>
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: 'profile',
                headerShown: false,
                tabBarIcon: ({color , focused}) =>(
                    <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}></TabIcon>
                )
            }}/>
        </Tabs>
    </>
  )
}

export default TabLayout

const styles = StyleSheet.create({})