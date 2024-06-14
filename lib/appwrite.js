import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite'
export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.aora',
	projectId: '6638a84800102b1faf24',
	databaseId: '663908160015e7bc4288',
	userCollectionId: '663908290024e99758a0',
	videoCollectionId: '6639084700214c026a02',
	storageId: '663909b9002cf2799d8a'
}

// Init your React Native SDK
const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)
// Register User
export const createUser = async ({email, username, password}) => {
	// await account.deleteSession('current')

	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)
		if (!newAccount) throw Error
		const avatarUrl = avatars.getInitials(username)
		await signIn(email, password)

		const newUser =  await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(),{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl
		})
		return newUser
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}
export const signIn = async(email, password) => {
		// await account.deleteSession('current')

		try {
				const session = await account.createEmailPasswordSession(email, password)
				return session
		} catch (error) {
				throw new Error(error)
		}
}
export async function getAccount() {
	// account.deleteSession('current')
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}
export const getCurrentUser = async() => {
		try {
			const currentAccount = await getAccount();
			if (!currentAccount) throw Error

				const currentUser = await databases.listDocuments(
						config.databaseId,
						config.userCollectionId,
						[Query.equal("accountId", currentAccount.$id)]
					)
				if(!currentUser) throw Error
				return currentUser.documents[0]
		} catch (error){
			return null
		}
}
export const getFilePreview = async()=>{
	let fileUrl;
	try {
		if(type === 'video') {
			fileUrl = storage.getFileView(config.storageId, fileId)
		}else if(type==='image'){
			fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
		}else{
			throw new Error('Invalid file type')
		}
		if (!fileUrl) throw Error;

		return fileUrl;
	}catch (error) {
		throw new Error(error);
	}
}
export const uploadFile = async() => {
	if(!file) return;

	const {mimeType, ...rest} = file;
	const asset = {type: mimeType, ...rest}
	try {
		const uploadedFile = await storage.createFile(
			config.storageId,
			ID.unique(),
			asset
		)
		const fileUrl = await getFilePreview(uploadedFile.$id, type)
		console.log(fileUrl);
		return fileUrl
	}catch(error){
		throw new Error(error)
	}
}
export const createVideo = async(form) => {
	console.log(form);
	try{
	const [thumbnailUrl, videoUrl] = await Promise.all([
		uploadFile(form.thumbnail,'image'),
		uploadFile(form.video,'video')
	])
	const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
		title: form.title,
		thumbnail: thumbnailUrl,
		video: videoUrl,
		prompt: form.prompt,
		creator: form.userId
	})
	console.log(newPost);
	return newPost
	}catch(error){

	}
}
export const getAllPosts = async() => {
	try{
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId
		)
		return posts.documents
	}catch(error){

	}
}