import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import homeContact from '../../assets/styles/homeContact.module.css'

const Subscribe = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_w5vn4y9', form.current, 'dSgJh36b-64n40_h0')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <section className={homeContact.contact} >
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <article className={homeContact.article}>
                        <h1 className={homeContact.text_h1} >TRIAL START FIRST 30 DAYS.</h1>
                        <p>Enter your email to create or restart your membership.</p>
                    </article>
                </Grid>
                <Grid item md={6} xs={12}>
                    <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className={homeContact.contact_input_container} >
                            <TextField className={homeContact.contact_input} name="message" placeholder='Enter your message ...' /><br />
                            <button className={homeContact.contact_button} type="submit" value="Send">GET STARTED</button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </section>

    )
}

export default Subscribe