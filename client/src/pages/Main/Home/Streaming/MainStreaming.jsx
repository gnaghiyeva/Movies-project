import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import streamingLogo from '../../../../assets/images/live_img.png'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getAllStreamings } from '../../../../api/requests';

const MainStreaming = () => {
  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [streamings, setStreamings] = useState([])
  useEffect(() => {
    getAllStreamings().then((res) => {
      setStreamings(res.data)
      console.log(res.data)
    })
  }, [])//streamings

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 100); 

    return () => {
      clearInterval(interval); 
    };
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false); 
  };

  // const youtubeLink = 'https://www.youtube.com/embed/hZGR5Sj1Bfo';

  return (
    <section style={{width:'100%',padding:'40px 100px'}}>
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <article>
          <h5>Online Streaming</h5> 

          {streamings && streamings.map((stream) => (
            <>
              <h1>{stream.title}</h1> <br/>
              <p>{stream.desc}</p>
            </>
          ))}

          <div style={{ display: 'flex', gap: '25px' }}>
            <span style={{ fontSize: '60px', textShadow: '0px 3px 24px rgba(160, 160, 160, 0.09)', lineHeight: '1', color: '#d81c2b' }}>HD 4K</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '900', fontSize: '38px', textShadow: '0px 3px 4px rgba(30, 30, 30, 0.18)' }}>{counter <= 20 ? counter : '20'}K+</span>
              <p style={{ fontWeight: '400', fontSize: '38px' }}>Costumer</p>
            </div>
          </div>
          <Button
            style={{ border: 'none', backgroundColor: '#e4d804', padding: '15px 30px', borderRadius: '20px', color: 'black' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'black';
              e.target.style.border = '1px solid #e4d804 '
            }}
            onMouseLeave={(e) => {

              e.target.style.backgroundColor = '#e4d804';
              e.target.style.color = 'black';
            }}

            onClick={handleOpenModal}
          >
            <PlayArrowIcon />Watch Now
          </Button>
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>YouTube Video</DialogTitle>
            {streamings && streamings.map((stream)=>{
             return(
              <DialogContent>
              <iframe
                width="560"
                height="315"
                src={stream.link}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Video"
              ></iframe>

            </DialogContent>
             )

            })}
          </Dialog>
        </article>
      </Grid>
      <Grid item md={6} xs={12}>
        <img style={{ width: '100%' }} src={streamingLogo} alt="Streaming Logo" />
      </Grid>
    </Grid>
    </section>
  )
}

export default MainStreaming