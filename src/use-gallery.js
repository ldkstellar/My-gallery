import * as ImagePicker from 'expo-image-picker';// ?
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firstAlbum = {
    id:1,
    title:"기본",
}

const ASYNC_KEY = {
  IMAGES:"images",
  ALBUMS:"albums",
}


export const useGallery = ()=>{
    const [images,setImages] = useState([]);
    const [selectedAlbum,setSeletedAlbum] = useState(firstAlbum);
    const [TextModalState,setTextModalState] = useState(false);
    const [albumTitle,setAlbumTitle] =  useState('');
    const [albums,setAlbums] = useState([firstAlbum]);
    const [isDropdownOpen,setIsDropdownOpen] = useState(false);
    const [ImageModalState,setImageModalState] = useState(false);
    const [selectedImage,setSeletedImage] = useState(null);

    const _setImages = (newImages) =>{
      setImages(newImages);
      AsyncStorage.setItem(ASYNC_KEY.IMAGES,JSON.stringify(newImages));
    }

    const _setAlbums = (newAlbums) =>{
      setAlbums(newAlbums);
      AsyncStorage.setItem(ASYNC_KEY.ALBUMS,JSON.stringify(newAlbums));
    }

    const pickImage = async () => {// 비동기적으로 작동한다.
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const lasatId = images.length === 0 ?0:images[images.length-1].id +1;
        const newImages =
        {   
            id:lasatId ,
            uri:result.assets[0].uri,
            albumId: selectedAlbum.id
        }
        _setImages([...images,newImages]);
      }
    };

    const deleteImage = (imageid)=>{
      Alert.alert("이미지를 삭제하시겠어요?","",[
            {
              text:"네",onPress:()=>{
                const newImages = images.filter((image)=> image.id !== imageid);
                _setImages(newImages);}
            }
            ,
            {
              text:"아니오"
            }]);
    }

    const deleteAlbum = (albumId)=>{
      if (albumId=== 1) {
        return;
      }
      Alert.alert("앨범을 삭제하시겠어요?","",[
        { text:"네",onPress:()=>{
          const newAlbums = albums.filter((album)=> album.id !== albumId);
          _setAlbums(newAlbums);
          setSeletedAlbum(firstAlbum);
          const newImages = images.filter((image)=> albumId !== image.albumId);
          setImages(newImages);}
        },

        {text:"아니오"}]);
    }

    const filteredImages = images.filter((image)=>image.albumId === selectedAlbum.id);
    const imageAddButton = [...filteredImages,{id:-1,uri:""}];

    const addAlbum = ()=>{
      const lastId = albums.length === 0 ? 0:albums[albums.length-1].id+1;
      const newAlbum= {
          id:lastId,
          title:albumTitle,
      }

      _setAlbums([...albums,newAlbum]);
      setSeletedAlbum(newAlbum);
    }

    const resetAlbumTitle = ()=>setAlbumTitle('');
    const onPressWatchAd = ()=>{
      console.log('load ad');
    }
    const openTextModal = ()=>{

      setTextModalState(true); 
    }
      
    const closeImageModal = ()=>{

      setImageModalState(false);
    }
    const openImageModal = ()=>{

      setImageModalState(true);
    }
      
    const closeTextModal = ()=>{

      setTextModalState(false);
    }

      
    const onPressBackDrop = ()=>{
        closeTextModal();
    }

    const openDropdown = ()=>{
      setIsDropdownOpen(true);
    }
      
    const closeDropdown = ()=>{
      setIsDropdownOpen(false);
    }

    const choiceAlbum = (album)=>{
      setSeletedAlbum(album);
    }

    const selectImage = (image)=>{
      setSeletedImage(image);
    }

    const moveToPreviousImage = ()=>{

      // filtered Image를 사용한다.
      const seletedImageIndex = filteredImages.findIndex(image =>image.id === selectedImage.id);
      const previousImageIndex = seletedImageIndex -1;
      
      if (previousImageIndex === -1) {
        const previousImage = filteredImages[filteredImages.length-1];
        setSeletedImage(previousImage);
        return;
      }

      const previousImage = filteredImages[previousImageIndex];
      setSeletedImage(previousImage);
    }

    const moveToNextImage = ()=>{
      // filtered Image를 사용한다.

      const seletedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
      const nextImageIndex = seletedImageIndex+1;
      
      if (nextImageIndex > filteredImages.length-1){
        const nextImage = filteredImages[0];// 이미지의 uri 값을 리턴 받는다. 
        setSeletedImage(nextImage);
        return;
      }

      const nextImage = filteredImages[nextImageIndex];      
      setSeletedImage(nextImage);

    }

    const initValues = async() =>{
      const fs = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
      if (fs !== null) {
        const parsed = JSON.parse(fs);
        setImages(parsed);
       
      }
    }
    const initAlbums =  async()=>{
      const fs = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
      if (fs != null) {
        const parsed = JSON.parse(fs);
        setAlbums(parsed);
        
      }
    }
    const clear = async()=>{
      await AsyncStorage.clear();
    }

    useEffect(()=>{
      
        initValues();
        initAlbums();
      
    },[]);

    return{
      images,
      pickImage,
      deleteImage,
      imageAddButton,
      selectedAlbum,
      TextModalState,
      albumTitle,
      setAlbumTitle,
      addAlbum,
      resetAlbumTitle,
      albums,
      onPressBackDrop,
      openDropdown,
      closeDropdown,
      isDropdownOpen,
      choiceAlbum,
      deleteAlbum,
      openTextModal,
      closeTextModal,
      closeImageModal,
      openImageModal,
      ImageModalState,
      closeImageModal,
      selectedImage,
      setSeletedImage,
      selectImage,
      moveToPreviousImage,
      moveToNextImage,
    }
}