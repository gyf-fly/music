<template>
    <div>
        <Loading v-if="Load"></Loading>
        <div class="hotsongtop">
            <div class="hotopct">
                <div class="hotopbg"></div>
                <div class="time">更新日期：{{$formatDate(time).format("MM月DD日")}}</div>
            </div>
        </div>
        <div class="hotsongmain">
            <div class="songbox" v-if="flag">
                <a href="javascript:;" v-for="(item,index) in songName" :key="index">
                    <div class="songleft">
                        {{index + 1 | num}}
                    </div>
                    <div class="songmain" @click="toPlayer(item)">
                        <div>
                            <div class="itename">
                                {{item.name}}
                            </div>
                            <div class="mainbox">
                                <div class="songname">
                                    {{item.ar[0].name}} - {{item.name}}
                                </div>
                            </div>
                        </div>
                        <div class="songright">
                            <div class="right-bg"></div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="songbox" v-else>
                <a href="javascript:;" v-for="(item,index) in songNames" :key="index">
                    <div class="songleft">
                        {{index + 1 | num}}
                    </div>
                    <div class="songmain" @click="toPlayer(item)">
                        <div>
                            <div class="itename">
                                {{item.name}}
                            </div>
                            <div class="mainbox">
                                <div class="songname">
                                    {{item.ar[0].name}} - {{item.name}}
                                </div>
                            </div>
                        </div>
                        <div class="songright">
                            <div class="right-bg"></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="hoton">
            <div class="hotview">
                <span @click="songs">查看完整榜单</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 22"><path fill="none" stroke="#ccc" stroke-width="2" stroke-miterlimit="10" d="M1 1l10 10L1 21"/></svg>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading/loading.vue'
    export default {
        components:{
            Loading
        },
        data() {
            return {
                time:new Date,
                songName:[],
                Load:false,
                songNames:[],
                flag:true
            }
        },
        created(){
            this.getToplist();
        },
        methods:{
            songs(){
                this.flag = !this.flag
            },
            toPlayer(data){
                // console.log(data);
                let obj={
                    path:"/player",
                    query:{
                        id:data.id,
                        picUrl:data.al.picUrl,
                        name:data.name,
                        nickName:data.ar[0].name
                    }
                }
                // console.log(obj);
                this.$router.push(obj);
            },
            getToplist(){
                this.Load = true;
                this.$http.get("/api/toplist").then(res =>{
                    // console.log(res);
                    var Toplist = ''
                    if(res.status == 200){
                        Toplist = res.data.list[3].id;
                    }else{
                        console.error(res.statusText)
                    }
                    this.Load = false;
                    // console.log(Toplist);
                    this.$http.get("/api/playlist/detail?id="+Toplist).then(res =>{
                        // console.log(res,"热歌榜");
                        var playlist = '';
                        var ids = [];
                        var idss = [];
                        if(res.status == 200){
                            playlist = res.data.playlist.trackIds
                        }else{
                            console.error(res.statusText)
                        }
                        // console.log(playlist,"playlist");
                        playlist.forEach(item => {
                            if(ids.length < 20){
                                ids.push(item.id);
                            }else{
                                idss.push(item.id)
                            }
                        });
                        // console.log(idss);
                        this.$http.get("/api/song/detail?ids="+ids).then(res =>{
                            // console.log(res,"id");
                            if(res.status == 200){
                                this.songName = res.data.songs;
                                // console.log(this.songName);
                            }else{
                                console.error(res.statusText)
                            }
                        });
                        this.$http.get("/api/song/detail?ids="+idss).then(res =>{
                            // console.log(res,"id");
                            if(res.status == 200){
                                this.songNames = res.data.songs;
                                // console.log(this.songNames);
                            }else{
                                console.error(res.statusText)
                            }
                        })
                    })
                })
            },
        },
        filters:{
            num(val){
                if(val > 9){
                   return val
                }else{
                    return "0" + val;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.hotsongtop{
    padding-top: 38.9%;
    overflow: hidden;
    background: url("../../assets/images/hot_music_bg.jpg") no-repeat;
    background-size: contain;
    position: relative;
    .hotopct{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .hotopbg{
            width: 142px;
            height: 67px;
            background: url("../../assets/images/index_icon.jpg") -24px -30px;
            background-size: 166px 97px;
        }
        .time{
            margin-top: 10px;
            font-size: 12px;
            color: hsla(0,0%,100%,.8);
        }
    }
}
.hotsongmain{
    background-color: #ffffff;
    .songbox{
        a{
            display: flex;
            color: #333;
            .songleft{
                flex: 1;
                width: 40px;
                font-size: 17px;
                color: #df3436;
                line-height: 55px;
                text-align: center;
            }
            .songmain{
                flex: 16;
                border-bottom: 1px solid #eeeeee;
                display: flex;
                justify-content: space-between;
                .itename{
                    margin-top: 10px;
                    font-size: 17px;
                }
                .mainbox{
                    display: flex;
                    font-size: 12px;
                    color: #888;
                    .songname{
                        margin-right: 5px;
                    }
                    &::before{
                        content: "";
                        width: 12px;
                        height: 8px;
                        background: url("../../assets/images/index_icon.jpg") no-repeat 0px 0px;
                        background-size: 166px 97px;
                        margin-top: 5px;
                        margin-right: 5px;
                    }
                }
                .songright{
                    width: 42px;
                    height: 100%;
                    position: relative;
                    padding: 0 10px;
                    .right-bg{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        background: url("../../assets/images/index_icon.jpg") no-repeat -24px 0px;
                        background-size: 166px 97px;
                    }
                }
            }
        }
    }
}
.hoton{
    height: 55px;
    line-height: 55px;
    text-align: center;
    .hotview{
        display: inline-block;
        color: #999;
        span{
            display: inline-block;
            padding: 0 7px;
        }
        svg{
            width: 7px;
            height: 12px;
        }
    }
}
</style>