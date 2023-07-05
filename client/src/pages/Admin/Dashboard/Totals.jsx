import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { getAllBlogs, getAllContactUsers, getAllFilms, getAllUpcomingSongs } from '../../../api/requests';
import { Grid } from '@mui/material';
const { Meta } = Card;

const Totals = () => {
    const [films, setFilms] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([])
    const [songs, setSongs] = useState([])
    useEffect(() => {
        getAllFilms().then((res) => {
            setFilms(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(()=>{
        getAllBlogs().then((res)=>{
            setBlogs(res.data)
        })
    },[]);

    useEffect(()=>{
        getAllContactUsers().then((res)=>{
            setUsers(res.data)
        })
    })

    useEffect(()=>{
        getAllUpcomingSongs().then((res)=>{
            setSongs(res.data)
        })
    })
    return (
        <>
            <Grid container spacing={2} style={{padding:'25px 60px'}}>
                <Grid item xs={12} md={3}>
                    <Card
                        style={{
                            width: 300,
                        }}
                    >
                        <Meta
                            avatar={<Avatar style={{width:'50px', height:'50px'}} src="https://img.freepik.com/premium-vector/film-camera-logo_7108-42.jpg?w=2000" />}
                            title="Total Films"
                            description={`${films.length}`}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card
                        style={{
                            width: 300,
                        }}
                    >
                        <Meta
                            avatar={<Avatar style={{width:'50px', height:'50px'}} src="https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-5.png" />}
                            title="Total Blogs"
                            description={`${blogs.length}`}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card
                        style={{
                            width: 300,
                        }}
                    >
                        <Meta
                            avatar={<Avatar style={{width:'50px', height:'50px'}} src="https://e7.pngegg.com/pngimages/389/412/png-clipart-font-awesome-computer-icons-user-profile-users-group-blind-miscellaneous-blue-thumbnail.png" />}
                            title="Total Users"
                            description={`${users.length}`}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card
                        style={{
                            width: 300,
                        }}
                    >
                        <Meta
                            avatar={<Avatar style={{width:'50px', height:'50px'}} src="https://img.freepik.com/premium-vector/love-music-sticker-logo-icon-vector-songs-music-player-playlist-logo-vector-isolated-background-eps-10_399089-1088.jpg?w=2000" />}
                            title="Total Songs"
                            description={`${songs.length}`}
                        />
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}

export default Totals