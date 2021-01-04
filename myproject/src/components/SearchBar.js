import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';

const SearchBar = props => {
    return(
        <View>
            <TextInput
                style = {{padding: 10, backgroundColor: 'white'}}
                placeholder = {props.text}
                onChangeText = {newText => props.textChange(newText)}
            />
        </View>
    )
}

export default SearchBar;
