<template>
  <div>
    <Loading v-if="Load"></Loading>
    <div class="searchtop">
      <van-search
        @input="subKey"
        @blur="saveKey"
        v-model="searchValue"
        @clear="clearKey"
        shape="round"
        placeholder="搜索歌手、歌曲、专辑"
      />
    </div>
    <div class="searchmain" v-if="isShowKey">
      <p>热门搜索</p>
      <ul class="ullist">
        <li @click="subKey(item.first)" v-for="(item,index) in searchList" :key="index">
          <a href="javascript:;" class="namespan">{{item.first}}</a>
        </li>
      </ul>
    </div>
    <div class="recommend newmusic" v-if="keySongsList.length && !isShowKey">
      <div
        class="newsong"
        v-for="(item,index) in keySongsList"
        :key="index"
        @click="toPlayer(item)"
      >
        <a href="javascript:;" @click="toPlayer(item)">
          <div class="newsong-left">
            <p>{{item.name}}</p>
            <div class="ite">
              <div>
                <p class="itename">{{item.name}}-{{item.artists[0].name}}</p>
              </div>
            </div>
          </div>
          <div class="newsong-right">
            <div class="right-bg"></div>
          </div>
        </a>
      </div>
    </div>
    <!-- 已经查询列表 -->
    <div class="show-key" v-if="isShowKey">
      <ul>
        <li v-for="(item,index) in doList" :key="index">
          <van-icon color="#ccc" class="icon1" name="clock-o" />
          <span @click="subKey(item)">{{item}}</span>
          <van-icon color="#ccc" class="icon2" @click="removeKey(item)" name="cross" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading/loading.vue";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      searchList: [],
      Load: false,
      searchValue: null, //热搜词查询关键字
      doList: [],
      isShowKey: true, //是否显示热搜词
      keySongsList: [],
      img: "",
    };
  },
  created() {
    this.getsearchList();
  },
  methods: {
    removeKey(val) {
      this.doList = this.doList.filter((item) => item != val);
    },
    toPlayer(data) {
      console.log(data);
      let obj = {
        path: "/player",
        query: {
          picUrl: data.artists[0].img1v1Url,
          name: data.name,
          id: data.id,
          nickName: data.artists[0].name,
        },
      };
      this.$router.push(obj);
    },
    getsearchList() {
      this.Load = true;
      this.$http.get("/api/search/hot").then((res) => {
        console.log(res);
        if (res.status == 200) {
          var result = res.data.result;
          console.log(result.hots);
          result.hots.forEach((item) => {
            this.searchList.push(item);
          });
        } else {
          console.error(res.statusText);
        }
        this.Load = false;
      });
    },
    subKey(val) {
      // console.log(val);
      if (!val) return;
      this.searchValue = val;
      if (!this.doList.includes(this.searchValue)) {
        this.doList.unshift(val);
      }
      this.isShowKey = false;
      this.getKeyInfo();
    },
    saveKey() {
      if (this.searchValue && !this.doList.includes(this.searchValue)) {
        this.doList.unshift(this.searchValue);
      }
    },
    // 关键字查询接口
    getKeyInfo() {
      this.loading = true;
      this.$http
        .get("/api/search", { params: { keywords: this.searchValue } })
        .then((res) => {
          console.log(res, "搜索");
          if (res.status == 200) {
            this.keySongsList = res.data.result.songs;
            // console.log(this.keySongsList);
          } else {
            console.error(res.statusText);
          }
          this.loading = false;
        });
    },
    clearKey() {
      // 当清空关键字的时候显示热搜词
      this.isShowKey = true;
    },
  },
};
</script>

<style lang="less" scoped>
&/deep/ .van-search__content--round {
  background: #ebecec;
}
&/deep/.van-search {
  padding: 15px 10px;
}
&/deep/.van-cell {
  padding: 3px 8px 3px 0;
}
&/deep/.van-field__left-icon {
  margin-right: 8px;
}
.searchtop {
  border-bottom: 1px solid #eeeeee;
}
.show-key {
  padding: 0 10px;
  ul {
    li {
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
      position: relative;
      line-height: 40px;
      list-style: none;
      .icon1 {
        margin-right: 10px;
        vertical-align: middle;
      }
      .icon2 {
        vertical-align: middle;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      span {
        vertical-align: middle;
        display: inline-block;
        width: calc(100% - 60px);
      }
    }
  }
}
.searchmain {
  padding: 15px 10px 0;
  p {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  .ullist {
    margin: 10px 0 7px;
    li {
      list-style: none;
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #d3d4da;
      border-radius: 32px;
      .namespan {
        display: inline-block;
        color: #333;
      }
    }
  }
}
.recommend {
  padding-top: 20px;
  margin-left: 10px;
  .imgs {
    p {
      font-size: 12px;
      line-height: 16px;
      color: #666;
    }
    img {
      margin: 8px 10px 8px 0;
      display: inline-block;
      width: 50px;
      height: 50px;
    }
  }
  .rec-p {
    position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    color: #333;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
  .muice-ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: space-between;
    padding-bottom: 40px;
    li {
      flex: calc(33% - 3px);
      margin-bottom: 10px;
      margin-right: 3px;
      &:nth-child(3n) {
        margin: 0px;
      }
      a {
        color: #333;
        display: block;
        position: relative;
        img {
          display: block;
          width: 100%;
        }
        .remd_text {
          font-size: 13px;
          padding: 6px 2px 0 6px;
        }
        .playCount {
          position: absolute;
          right: 5px;
          top: 2px;
          color: #fff;
          font-size: 12px;
          padding-left: 13px;
          svg {
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-top: 2px;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
.newsong {
  height: 55px;
  padding-left: 10px;
  a {
    height: 100%;
    display: flex;
    color: #333;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
    .newsong-left {
      font-size: 17px;
      margin-top: 10px;
      .ite {
        display: flex;
        &::before {
          content: "";
          width: 12px;
          height: 8px;
          background: url("../../assets/images/index_icon.jpg") no-repeat 0px
            0px;
          background-size: 166px 97px;
          margin-top: 5px;
          margin-right: 5px;
        }
        .itename {
          font-size: 12px;
          color: #888;
          margin-right: 5px;
        }
      }
    }
    .newsong-right {
      width: 42px;
      height: 100%;
      position: relative;
      padding: 0 10px;
      .right-bg {
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
</style>