import {Text,Image,FlatList,Dimensions,TouchableOpacity} from 'react-native'

const width = Dimensions.get('screen').width;
const minColmnsize = width>=500 ? 200: 130;
const divisor = width /minColmnsize;
const numColumns = Math.floor(divisor);
const columsize = width/numColumns;

export default ({
    imageAddButton,
    onPressOpenGallery,
    deleteImage,
    onPressImage,
    
    })=>{
    const renderItem = ({item:image,index})=>{
        const {id,uri} =image;
        if (id === -1) {
          return(
            <TouchableOpacity onPress={onPressOpenGallery} 
              style={{
                height:columsize, width:columsize ,
                backgroundColor:"lightgrey",
                justifyContent:"center",
                alignItems:"center" ,
              
              }}>
              <Text style={{fontSize:50,fontWeight:"400",color:"grey"}}>+</Text>
          </TouchableOpacity>
          )
        }
    
      return(
        <TouchableOpacity onLongPress={()=>deleteImage(id)} onPress={()=>onPressImage(image)}>
          <Image source={{uri:uri}} style={{height:columsize, width:columsize}}></Image>
        </TouchableOpacity>)
      }

    return(
        <FlatList
        data={imageAddButton}
        renderItem={renderItem}
        numColumns={numColumns}
        style={{zIndex:-1}}
      />
    )
}