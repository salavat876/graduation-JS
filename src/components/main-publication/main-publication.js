import React, {useState} from 'react';
import {Avatar ,Grid,Box } from '@material-ui/core';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import LikeBtnGroup from './like-group/likeGroup';

import { nanoid } from 'nanoid';

import {connect} from "react-redux";

import Slider from "./like-group/slider/Slider";
import {hideSlider, showSlider} from "../../redux/actions/slider";

const MainPublication = ({photosRes,showSlider}) =>{
    const classes = useStyles();
    return photosRes.map((item,index) => (
        <>
            <Grid key={nanoid(10)}  style={{ height: 'auto !important' }} item xs={4} >
                <div>
                    <div className="header-img-block">
                        <Avatar src={item.user.profile_image.small}></Avatar>
                        <Box className={classNames(classes.colorBlack,classes.nickName,classes.nickNameMain)}  component="span">
                            <a href={item.user.links.html}>{item.user.username}</a>
                        </Box>
                    </div>

                    <div onClick={()=>showSlider(index)} className="main-img">
                        <img src={item.urls.regular}/>
                    </div>

                    <div className="main-img_like">

                        <span className="like-counter">Нравится:{item.likes}</span>
                        <LikeBtnGroup
                            BigPhoto={item.urls.raw}
                            photoId = {item.id}
                            userNickName={item.user.username}
                            userIcon={item.user.profile_image.small}
                            isLiked={item.liked_by_user}
                        />
                    </div>
                </div>
            </Grid>
        </>


    ))
        
}


const useStyles = makeStyles({
    purpleAvatar:{
        backgroundColor:'purple'
    },
    colorBlack:{
        color:'#000000'
    },

    nickName:{
        marginRight:'10px'
    },
    nickNameMain:{
        margin:'0 0 0 20px',
    }
})
const mapStateToProps = (state) => {

    return {
        photosRes:state.initialLikes.arrPhotos
    }
}

const mapDispatchToProps = {
  showSlider,
    hideSlider
}


export default connect (mapStateToProps,mapDispatchToProps)(MainPublication);