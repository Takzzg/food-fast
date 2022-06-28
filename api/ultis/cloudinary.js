import {v2 as cloudinary} from 'cloudinary'



cloudinary.config({
    cloud_name: "diwebykgr", 
    api_key: "234979838848653", 
    api_secret: "fAGAWF7ygh28bLARjD_GvbriVWg",
    secure: true
  })
  

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'replit'
    })
  }

export const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId)
  }