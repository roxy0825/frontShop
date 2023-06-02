import { StyleSheet, View, Text,FlatList } from "react-native";
import { styles } from "../assets/styles/styles";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ListCustomer (){
    const [dataCustomers, setDataCustomers]= useState([]);
    const getCustomers = async()=>{
        const customers = axios.get('http://127.0.0.1:300/api/cliente');
        setDataCustomers(await customers.data);
    } 
    useEffect(()=>{
        if(!dataCustomers.length === 0){
            getCustomers();
            console.log(dataCustomers);
        }
    });
    return (
        <View style= {styles.container}>
            <Text style={{color:'blue', fontSize:25, marginBottom:10}}>Listado de clientes</Text>
            <FlatList
        data={dataCustomers}
        renderItem={({item}) => (<Text>{item._id} - {item.nombre}{item.apellidos}</Text>)}
      />
        </View>
    )
}