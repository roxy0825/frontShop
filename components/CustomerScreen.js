
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextInput,Button } from 'react-native-paper';
import { useState,useEffect,useRef } from 'react';


export default function App() {
  const [message, setMensage ] = useState('');
  const [isError, setIsError ] = useState(false);
  const [idSearch, setIdSearch ] = useState('');


  const { control, handleSubmit, formState: { errors }, reset ,setValue} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSave = async (data) => {
    let nombre = data.firstName
    let apellidos = data.lastName
    const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    setIsError(false);
    setMensage("Ciente creado correstamente");
    setTimeout(()=>{
      setMensage("");
    },2000)
    reset()
    setIdSearch('');
  };
  const onUpdate = async (data) => {
   
    const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`, {
      nombre: data.firstName,
      apellidos:data.lastName
    });
    setIsError(false);
    setMensage("Ciente Actualizado correstamente...");
    setTimeout(()=>{
      setMensage("");
    },2000);

  };
  const onDelete = async (data)=>{
    if (confirm(`Esta seguro de eliminar al cliente ${data.firstName} ${data.lastName}`)){
      const response = await axios.delete(`http://127.0.0:3000/api/clientes/${idSearch}`);
      setIsError(false);
      setMensage("Cliente se ha eliminado corresctamente...");
      setTimeout(()=>{
        setMensage('');
        reset();
       },2000);
       setIdSearch("");
      }
};
  const onSearch = async () => {
    const response = await axios.post(`http://127.0.0.1:3000/api/clientes/${idSearch}` );
    console.log(response.data)
    if (!response.data.error){
      setValue("firstName", response.data.nombre);
      setValue("lastname", response.data.apellidos);
      setIsError(false);
      setMensage('')
    }else{
      setIsError(true);
      setMensage("id de cliente No existe")
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:32}}>Clientes</Text>
      <TextInput
      label="id del cliente a buscar"
      mode='outlined'
      onChangeText={idSearch => setIdSearch(idSearch)}
      
      />
        
      
       <Controller
        control={control}
        rules={{
         required: true,

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
           label="Nombre completo"
           mode="outlined"
           left={<TextInput.Icon icon="account" />}
           style={{marginBottom:20,backgroundColor:"powderblue"}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          label="Apellidos"
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          style={{marginBottom:10,backgroundColor:"powderblue"}}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          />
        )}
        name="lastName"
      />
      {errors.firstName && <Text style={{color:'red'}}>Los Apellido es obligatorio</Text>}

      <Text style={{color: isError ? 'red' : 'green '}}>{message}</Text>

    <View style={{flexDirection:'row'}}>
      <Button icon="plus-box" mode="contained" onPress={handleSubmit(onSave) } style={{backgroundColor:'purple'}}>
   Guardar
  </Button>
  <Button icon="card-search-outline" mode="contained" onPress={onSearch} style={{backgroundColor:'purple'}}>
   Buscar
  </Button>
  </View>
  <View style={{flexDirection:'row',marginTop:10}}>
  <Button icon="card-search-outline" mode="contained" onPress={handleSubmit(onUpdate)} style={{backgroundColor:'purple'}}>
   Actualizar
  </Button>
  <Button icon="card-search-outline" mode="contained" onPress={handleSubmit(onDelete)} style={{backgroundColor:'purple'}}>
   Eliminar
  </Button>
  </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
