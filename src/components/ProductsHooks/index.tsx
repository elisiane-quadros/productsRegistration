import { useFieldArray, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "./styles.css"
import { useEffect } from "react";
import { Typography } from "@mui/material";

interface IProduct{
  code: string,
  description: string,
  price?: number,
}

type FormValues = {
  products:IProduct[],
}

export const ProductsHooks = () =>{
  const{ control,register, handleSubmit, formState:{
    errors,
  }}= useForm<FormValues>()
  const{ fields, append, remove } = useFieldArray({
    control,
    name: "products",
  })

  let flag = 0

  useEffect(() => {
    if(flag === 0){
      append(
        {
          code: "",
          description: "",
          price: undefined,
        }
      )
      flag++
    };
  },[])

  const add = () =>{
    append(
      {
        code: "",
        description: "",
        price: undefined,
      }
    )
  }
  console.log(errors)
  return (
    <div className="container">
      <h2 className="pageTitle">Products Registration</h2>
      <form onSubmit={handleSubmit((data)=>console.log(data))}>
        {fields.map((product,index) =>(
          <Grid container key={product.id} className="row"> 
            <Grid item md={1} sm={1} xs={12}>
              <Box className="amount">
                {index + 1} 
              </Box>
            </Grid> 
            <Grid item md={3} sm={2} xs={12}>
              <Box className="inputBox">
                <input
                  type="text" 
                  placeholder="Code"  
                  className="inputItem"          
                  {...register(`products.${index}.code`,{
                    required:"Code is a required field"
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name={`products.${index}.code`}
                  render={({ message }) => 
                    <span className="errorMessage">{message}</span>}
                />
              </Box> 
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Box className="inputBox">
                <input
                  type="text"
                  placeholder="Description"
                  className="inputItem"
                  {...register(`products.${index}.description`,{
                    required:"Description is a required field"
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name={`products.${index}.description`}
                  render={({ message }) => 
                    <span className="errorMessage">{message}</span>}
                /> 
              </Box>
            </Grid>
            <Grid item md={3} sm={2} xs={12}>
              <Box className="inputBox">
                <input 
                  type="number" 
                  placeholder="Price"
                  className="inputItem"
                  {...register(`products.${index}.price`,{
                    required:"Price is a required field"
                  })}
                  />
                <ErrorMessage
                  errors={errors}
                  name={`products.${index}.price`}
                  render={({ message }) => 
                    <span className="errorMessage">{message}</span>
                  }
                /> 
              </Box>
            </Grid>
            <Grid item md={2} sm={1} xs={12}>
              <button className="delete" onClick={() =>remove(index)}>Delete</button>
            </Grid>
          </Grid>
        ))}
        <Grid container>
          <Grid item md={1} sm={1} xs={12}>
            <Box className="totalItems">{'Total'}</Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={1} sm={1} xs={12}> 
            <Box className="totalItems">{fields.length}</Box>
          </Grid>
          <Grid item md={6} sm={6} xs={12} className="addGrid">
            <Box className="addButton" onClick={add}>Add</Box>
          </Grid>
          <Grid item md={5} sm={5} xs={12} >
            <button type="submit"className="sendButton">Send</button> 
          </Grid>
        </Grid>
      </form>
      
      {/*<pre>
        <code>
          {JSON.stringify(fields, null, 2)}
        </code>
              </pre>*/}
    </div>
  )
}