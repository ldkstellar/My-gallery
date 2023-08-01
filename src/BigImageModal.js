
import {Modal,Pressable,Image,View, TouchableOpacity} from "react-native"
import { AntDesign } from '@expo/vector-icons';

export default (
    {
        ImageModalState,
        onPressBackdropImage,
        selectedImage,
        onPressRight,
        onPressLeft
    }) =>{
    const ArrowButton = ({iconName,onPress})=>{
        return(
            <TouchableOpacity 
                style={{
                    paddingHorizontal:20,
                    height:280,
                    justifyContent:"center"}}
                onPress={onPress}>

                        <AntDesign name={iconName} size={20} color="black"/>

            </TouchableOpacity>
        )
    }

    return(
       <Modal
        animationType="fade"
        transparent={true}
        visible={ImageModalState}>
            <Pressable 
                style={{
                    flex:1, 
                    backgroundColor:`rgba(115,115,115,0.5)`,// rgba는 백틱으로 사용 가능 
                    alignItems:"center",
                    justifyContent:"center",
                    
                }} 
                onPress={onPressBackdropImage}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <ArrowButton iconName="left" onPress={onPressLeft}/>
                    
                    <Pressable>
                        {/* 이미지 */}
                        <Image 
                            source={{uri:selectedImage?.uri}} 
                            style={{width:280,height:280,backgroundColor:"white"}} 
                            resizeMode="contain"//크기별로 바뀐다.
                            backgroundColor="white"
                            />
                    </Pressable>

                        <ArrowButton iconName="right" onPress={onPressRight}/>
                </View>    
            </Pressable>
       </Modal>

    )
}