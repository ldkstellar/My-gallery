import { Modal, View ,SafeAreaView, TextInput, KeyboardAvoidingView,Pressable} from "react-native"
import { Platform } from "react-native"

export default ({modalVisible,albumTitle,setAlbumTitle,onSubmitEditing,onPressBackDrop}) =>{
    return(
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>

                <KeyboardAvoidingView
                    behavior={Platform.OS ==="ios" ? "padding" : "height"}
                    style={{flex:1}}>
                        
                        <Pressable style={{flex:1}} onPress={onPressBackDrop}>

                            <SafeAreaView style={{
                                width:"100%",
                                position:"absolute",
                                bottom:0}}>
                            
                                <TextInput 
                                    style={{
                                        width:"100%",padding:10,
                                        borderWidth:0.5,
                                        borderColor:"lightgrey",
                                        backgroundColor:"white"
                                        }}
                        
                                    placeholder="앨범명을 입력하세요"
                                    value={albumTitle}//완료된 결과 값
                                    onChangeText={setAlbumTitle}
                                    onSubmitEditing={onSubmitEditing}
                                    autoFocus={true}/>
                        </SafeAreaView> 
                    </Pressable>
                </KeyboardAvoidingView>
            </Modal>
        </View>
        )
}