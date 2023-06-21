import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import emailjs from '@emailjs/browser';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { Card } from 'antd';
import { Divider } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DraftsIcon from '@mui/icons-material/Drafts';
import bigContactStyle from '../../../../assets/styles/bigContact.module.css'
import { getAllContacts } from '../../../../api/requests';
const BigContact = () => {

    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts().then((res) => {
            setContacts(res.data)
        })
    }, [])

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
        <section style={{ backgroundColor: 'rgb(16,15,23)', color: 'white', paddingTop: '60px' }}>

            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <article>
                        <h1>Contact Form</h1>
                    </article>
                    <br /> <br /> <br />

                    <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', border: '1px solid gray' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '15px 20px' }}>

                            <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} name="message" placeholder='name'></TextField> <br />
                            <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} name="message" placeholder='surname'></TextField> <br />
                            <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} name="message" placeholder='subject' ></TextField> <br />
                            <TextareaAutosize style={{ backgroundColor: 'rgb(31,30,36,1)', color: 'white', height: '100px' }} name="message" /><br />
                            <Button style={{ width: '20%', backgroundColor: 'transparent', border: '1px solid yellow', padding: '16px 15px', borderRadius: '20px' }} variant='contained' color='success' type="submit" value="Send">Send Message</Button>
                        </div>
                    </form>
                </Grid>
                {contacts && contacts.map((contact) => {
                    return (
                        <Grid item xs={12} md={6}>
                            <article>
                                <h1>Information</h1>
                            </article>
                            <br /> <br /> <br />

                            <Card style={{ textAlign: 'left', backgroundColor: 'rgb(31,30,36)', color: 'white' }} bordered={false}>
                                <p>{contact.desc}</p>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <EditLocationIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0' }}>Address : {contact.address}</h3>
                                </div>

                                <Divider></Divider>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <LocalPhoneIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0', color: 'white' }}><a style={{ color: 'white' }} href={`tel:${contact.phone}`}>Phone :{contact.phone}</a></h3>

                                </div>

                                <Divider></Divider>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <DraftsIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0', }}><a style={{ color: 'white' }} href={`mailto:${contact.email}`}>Email : {contact.email}</a></h3>
                                </div>
                            </Card>
                        </Grid>
                    )
                })}


            </Grid>


        </section>
    )
}

export default BigContact