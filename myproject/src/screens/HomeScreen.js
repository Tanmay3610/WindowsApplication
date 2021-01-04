import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet,ScrollView, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import salt from '../api/salt';

const HomeScreen = props => {
    const [text, changeText] = useState('');
    const [medicineList, getMedicineList] = useState();

    const getList = async(query) =>{
        const medicineResultResponse = await salt.get('/label.json',{
            params: {
                count: 'openfda.generic_name.exact',
                search: query,
                limit: 50}});
        getMedicineList(medicineResultResponse.data);
    }

    const titleCase = string => {
        var sentence = string.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        sentence.join(" ")
        return sentence;
    }
    return(
        <View style = {{margin: 15}}>
            <View style = {{alignItems: 'center'}}>
                <Image source={require('../../assets/banner.jpg')} />
                <Text style = {{fontSize: 30, marginBottom: 15}}>GET MEDICINAL SALTS</Text>
            </View>
            <SearchBar text = 'Enter Disease....' textChange = {newText => changeText(newText)}/>
            <View style = {{justifyContent: 'center', margin: 10, alignItems: 'center'}}>
            <TouchableOpacity style = {Style.buttonStyle} onPress = {() => {
                    getList(text);
            }}>
                <Text style = {{color: 'white', fontSize: 25}}>Search</Text>
            </TouchableOpacity>
            </View>
            <ScrollView>
            {medicineList ? (
                <View style = {{marginLeft: 15, marginBottom: 190}}>
                    <FlatList
                        data={medicineList.results}
                        renderItem={({item}) => {
                            return <View>
                                <Text style = {{
                                    color: 'black',
                                    marginVertical:5,
                                    flex: 1,
                                    marginLeft: 7,
                                    lineHeight: 20,
                                    fontSize: 18}}>
                                    {titleCase(item.term)}</Text>
                            </View>
                        }}
                    />
                </View>): null}
                <View style = {{marginBottom: 1000}} />
                </ScrollView>
        </View>
    )
};

const Style = StyleSheet.create({
   buttonStyle:{
       backgroundColor: 'rgb(79, 189, 246)',
       borderRadius: 10,
       borderWidth: 1,
       borderColor: 'rgb(79, 189, 246)',
       height: 60,
       width: '100%',
       alignItems: 'center',
       padding: 12,
   }
});

export default HomeScreen;
