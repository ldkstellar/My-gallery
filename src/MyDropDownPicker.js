import { useState } from "react";
import { View,Text, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 
      
export default ({selectedAlbumTitle,openTextModal, isDropdownOpen,onPressHeader,albums,onPressAlbum,deleteAlbum},)=>{
    
    const onPress = ()=>{
        
        openTextModal();  
    }
    const headerheihgt = 50;
    return(
        <View>

        <TouchableOpacity 
            activeOpacity={1}
            style={{
            flexDirection:"row",
            position:"relative",
            height:headerheihgt,
            justifyContent:"center",
            alignItems:"center",
            }}
            onPress={onPressHeader}>
            <Text style={{fontWeight:"bold"}}>{selectedAlbumTitle}</Text>
            <AntDesign name={isDropdownOpen? "down":"up"} style={{paddingLeft:10,fontSize:14}} />
            <View style={{
                position:"absolute" ,
                right:0,
                height:headerheihgt,
                justifyContent:"center",
                alignItems:"center"
                }}>
        
                <TouchableOpacity 
                    
                    style={{    
                    paddingHorizontal:10,
                    paddingVertical:10,
                    }}
                    onPress={onPress}>
                        
                    <Text>앨범추가</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        
            {isDropdownOpen && (
                    <View style={{
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        top:headerheihgt,
                        position:"absolute",
                        width:"100%",
                        height:100,
                        backgroundColor:"white",
                        borderTopWidth:1,
                        borderTopColor:"lightgrey",
                        borderBottomWidth:1,
                        borderBottomColor:"lightgrey"
                    }}>
                        {albums.map((album,index)=>(
                            <TouchableOpacity
                                style={{
                                    flex:1,
                                    justifyContent:"center"
                                }}
                                key={`album-${index}`}
                                onPress={()=>onPressAlbum(album)}
                                onLongPress={()=>deleteAlbum(album.id)}
                                >
                                    
                                <Text style={{fontSize:14 ,fontWeight: selectedAlbumTitle === album.title?"bold":undefined}}>
                                    {album.title}
                                </Text>

                            </TouchableOpacity>
                        ))}
                            
                    </View>
                    )}
        </View>
    
    )
}