<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="search_bar">

          <input type="text" v-model="songName" placeholder="请输入你想听的歌曲" @keydown.enter="searchSong(songName)" />
          <img src="../jpg/music/zoom.png" @click="searchSong" class="search-icon" alt="" />
        </div>

      </div>
      <div class="body">
        <div class="list">
          <ul class="song_list">
            <li @dblclick="playerSong(song.id)" v-for="song in songsList" :key="song.id">
              &nbsp; {{ song.name }}-{{ song.album.name }}
            </li>
          </ul>


        </div>
        <div class="mv">
          <div class="player_con">
           
            <img src="../jpg/music/player_bar.png" ref="playBar" class="play_bar" />
            
            <img src="../jpg/music/disc.png" ref="disc" class="disc autoRotate" />
          
            <img :src="playImg" ref="cover" class="cover autoRotate" />
          </div>
        </div>

        <div class="comment_list">
          <div>
            <dl v-for=" v in hotComment">
              <dt>
                <img :src="v.user.avatarUrl" alt="" />
              </dt>
              <dd class="name">{{ v.user.nickname }}</dd>
              <dd class="detail">{{ v.content }}</dd>
            </dl>


          </div>
        </div>


      </div>

      <div class="footer" @click="audioPlay">
        <audio controls="controls" v-bind:src="musicUrl" autoplay="autoplay" loop="loop" class="myaudio"></audio>
      </div>

    </div>

  </div>
</template>
<style>
.body,
ul,
dl,
dd {
  margin: 0px;
  padding: 0px;
  overflow: auto;
}

.container {
  display: flex;
  justify-content: center;

  align-items: center;
  background: url('../jpg/music/con.jpg')  rgba(255, 255, 255, 0.45);
 

}

.search_bar {
  height: 78px;
  background-color: #1eacda;
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;
}

.search_bar img {
  margin-left: 23px;
  position: absolute;
  right: 60px;
  top: 27px;
}

.search_bar input {
  position: absolute;
  right: 30px;
  top: 20px;
  margin-right: 23px;
  width: 296px;
  height: 34px;
  border-radius: 17px;
  border: 0px;
  background: rgba(255, 255, 255, 0.45);
  text-indent: 15px;
  outline: none;
}

.main {

  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 600px;

}

.header {
  width: 100%;
  height: 13%;
  
}

.body {
  display: flex;
  width: 100%;
  height: 77%;

}

.list {
  position: relative;
  height: 100%;
  width: 20%;
  overflow: auto;
  background: url('../jpg/music/line.png') right center no-repeat;
  overflow: hidden;

}

.song_list {
  position: absolute;
  top: 2px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  height: 467px;
  white-space: nowrap;

}

.song_list li {
  font-size: 12px;
  color: #333;
  line-height: 36px;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.mv {
  height: 100%;
  width: 55%;

}


.player_con {
  width: 400px;
  height: 435px;
  position: relative;
  left: 75px;
}

.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 9;
}

.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}

.comment_list {
  width: 200px;
  height: 435px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  background: url('../jpg/music/line.png') left center no-repeat;
  overflow: hidden;
  position: relative;
}

.comment_list dl {
  padding-left: 55px;
  position: relative;
  margin-bottom: 20px;
}

.comment_list dt {
  position: absolute;
  left: 4px;
  top: 0px;
}

.comment_list dt img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.comment_list dd {
  font-size: 12px;
}

.comment_list .name {
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

.comment_list .detail {
  color: #666;
  margin-top: 5px;
  line-height: 18px;
}

.footer {
  width: 100%;
  height: 10%;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

}


.myaudio {
  position: relative;
  top: 5px;
  left: 0px;
  width: 100%;
  height: 45px;


  outline: none;

}

.playing {
  animation-play-state: running;
}

.play_bar {
  position: absolute;
  left: 210px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}



@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}



.play_bar.playing {
  transform: rotate(0);
}
</style>
<script>
import { ref } from 'vue';
import router from '@/router';
import axios from 'axios';
import { onMounted } from 'vue';
export default {
  setup() {

    const songName = ref()
    const songsList = ref()
    const musicUrl = ref()
    const playImg = ref()
    const hotComment = ref()
    const cover = ref()
    const disc = ref()
    const playBar = ref()

    const searchSong = async () => {
      try {
        const song = await axios.get('https://autumnfish.cn/search?keywords=' + songName.value)
 
        songsList.value = song.data.result.songs;
  
      } catch (error) {

      }
    };
    const playerSong = (id) => {

      axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
        musicUrl.value = res.data.data[0].url;
        showPlaying();
        
      });
      axios.get('https://autumnfish.cn/song/detail?ids=' + id).then(res => {
        playImg.value = res.data.songs[0].al.picUrl
      });
      getCommentList(id);
    };
    const showPlaying = () => {
      cover.value.classList.add('playing')
      disc.value.classList.add('playing')
      playBar.value.classList.add('playing')
    };
    const getCommentList = (id) => {
      axios.get('https://autumnfish.cn/comment/hot?id=' + id + '&type=0').then(res => {
        hotComment.value = res.data.hotComments;

      })
    }

    return {

      songName,
      searchSong,
      songsList,
      playerSong,
      musicUrl,
      playImg,
      hotComment,
      cover,
      disc,
      playBar
    }

  }
}
</script>
