import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import homeContact from '../../../../assets/styles/homeContact.module.css'
const MovieContact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_tsi07v3', form.current, 'dSgJh36b-64n40_h0')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
  return (
    <section className={homeContact.contact} style={{padding: '30px 60px', textAlign: 'center'}}>
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <article>
          <h1>TRIAL START FIRST 30 DAYS.</h1>
          <p>Enter your email to create or restart your membership.</p>
        </article>
      </Grid>
      <Grid item md={6} xs={12}>
        <form ref={form} onSubmit={sendEmail} style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex'}}>
            <TextField name="message" /><br/>
            <Button variant='contained' color='success' type="submit" value="Send">Send</Button>
          </div>   
        </form>
      </Grid>
    </Grid>
  </section>
  )
}

export default MovieContact