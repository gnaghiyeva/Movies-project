import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import Grid from '@mui/material/Grid';
import homeContact from '../../../../assets/styles/homeContact.module.css'
const HomeContact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_2cs8od6', form.current, 'dSgJh36b-64n40_h0')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
  return (
    <section className={homeContact.contact} style={{padding:'30px 0', display:'flex', alignItems:'center'}}>

<Grid container spacing={2}>
  <Grid item md={6}>
    <article>
        <h1>TRIAL START FIRST 30 DAYS.</h1>
        <p>Enter your email to create or restart your membership.</p>
    </article>
  </Grid>
  <Grid item md={6}>
 
 
  <form ref={form} onSubmit={sendEmail} style={{display:'flex', flexDirection:'column', width:'30%', margin:'0 auto'}}>
    <div style={{display:'flex'}}>
      <TextField type='email' name='email'  id="outlined-basic" label="title" variant="outlined" /><br/>
      <Button variant='contained' color='success' type="submit" value="Send">Send</Button>
    </div>   
    </form>
  </Grid>
 
</Grid>
    </section>
  )
}

export default HomeContact