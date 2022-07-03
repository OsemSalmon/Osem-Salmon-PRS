import { getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { ref } from 'vue'
import { projectStorage } from "../firebase/config"
import getUserAuth from './getUserAuth'

const { userAuth } = getUserAuth()
const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${userAuth.value.uid}/${file.name}`
        const storageRef = ref(projectStorage, `covers/${userAuth.value.uid}/${file.name}`)
        const uploadTask =  uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', snapshot => {
            const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
            console.log(percentage)
        })

        await uploadTask
        const url = await getDownloadURL(storageRef)
        console.log(url)
    }

    return {
        error, url, filePath, uploadImage
    }
}

export default useStorage