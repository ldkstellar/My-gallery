import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Modal,Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BigImageModal from './src/BigImageModal';
import ImageList from './src/ImageList';
export default function App() {

 const {
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
  openTextModal,
  closeTextModal,
  onPressBackDrop,
  openDropdown,
  closeDropdown,
  isDropdownOpen,
  choiceAlbum,
  deleteAlbum,
  ImageModalState,
  openImageModal,
  closeImageModal,
  selectedImage,
  selectImage,
  moveToPreviousImage,
  moveToNextImage,
  }  = useGallery();


  const onPressOpenGallery = ()=>{
    return pickImage();
  }

  const onPressHeader = ()=>{
    if (isDropdownOpen) {
        closeDropdown();
    }

    else{
      openDropdown();
    }
    
  }





  const onSubmitEditing = ()=>{
    if (!albumTitle) {
      return;
    }

    // 1. 앨범 타이틀 추가
    // 2. Text input 초기화 모달 닫기
   
    addAlbum();
    closeTextModal();
    resetAlbumTitle();
  }

  const onPressAlbum = (album)=>{
   
    choiceAlbum(album);
    closeDropdown();
  }

  const onPressImage = (image)=>{
   
    selectImage(image);
    openImageModal();
    

  }

  const onPressBackdropImage = ()=>{
    closeImageModal();
  } 

 

 const onPressLeft = ()=>{
  moveToPreviousImage();
 }

 const onPressRight = ()=>{
  moveToNextImage();
}
 

  return (
    <SafeAreaView style={styles.container}>
      {/* 이미지 dropdown */}
      <MyDropDownPicker 
        onPressHeader={onPressHeader}
        openDropdown={openDropdown}
        isDropdownOpen={isDropdownOpen}
        albums = {albums}
        onPressAlbum={onPressAlbum}
        selectedAlbumTitle={selectedAlbum.title}
        openTextModal = {openTextModal}
        deleteAlbum={deleteAlbum}
      />

      <BigImageModal
        ImageModalState={ImageModalState}//이미지모달 까지
        onPressBackdropImage={onPressBackdropImage}
        selectedImage={selectedImage}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
      />
        
       {/* 앨범 추가 모달 */}
      <TextInputModal
        image={images}
        modalVisible={TextModalState}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackDrop={onPressBackDrop}
        />

        <ImageList
          imageAddButton={imageAddButton}
          onPressOpenGallery={onPressOpenGallery}
          deleteImage={deleteImage}
          onPressImage={onPressImage}
        />
      
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flexDirection:"column",
      flex: 1,
      backgroundColor: '#fff',   
    },
  });
