import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

const client = new Client();

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.filipe.aora',
    projectId: '664680b7000ae1b086db',
    databaseId: '664682ac0010a7970442',
    userCollectionId: '664682e200040aa6e153',
    videoCollectionId: '66468326000e4f9ef814',
    storageId: '6646852a003540b8488a',
}

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (username: string, email: string, password: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }

        );
        return newUser;
    } catch (error: any) {
        throw new Error(error);
    }

}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId:string, type:string) =>{
  let fileUrl;
  try {
    if(type === 'video'){
        fileUrl = storage.getFileView(config.storageId, fileId);
    } else if(type === 'image'){
        fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);
    }
    else {
        throw new Error('Tipo do arquivo invalido')
    }

    if(!fileUrl) throw Error;
    return fileUrl;
  }  catch(error:any){
    throw new Error(error);
  } 

}

export const uploadFile = async (file, type:string) => {
    if(!file) return;

    const asset = { 
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    };

    try{

        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;

    } catch(error:any){
        throw new Error(error);
    }
}

export const createVideo = async (form) => {

    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);
        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        );
        return newPost;

    } catch (error: any) {
        throw new Error(error);
    }

}
