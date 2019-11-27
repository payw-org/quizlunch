<template>
  <div class="container">
    <div class="title">
      <div class="logo" />uizLunch
    </div>
    
    <div class="rng-area">
      <div class="rng-wrapper">
        <div class="top">
            <input class="masterKey" type="password" v-model="masterKey" required maxlength="80">
        </div>
        <div class="middle">
            <div class="rng-content-wrapper">
                <div class="rng-title">명사</div>
            </div>
            <div class="rng-container">
              <div class="rng-for" v-for="(noun,index) in nouns" v-bind:key="index">
                  <div class="rng-information">{{ noun.name }}</div>
                  <form class="rng-delete" v-on:submit.prevent="deleteNoun(noun.name);">
                      <input class="rng-button" type="submit" value="">
                  </form>
              </div>
            </div>
            <form class="rng-input" v-on:submit.prevent="postNoun();">
                <input class="rng-inputTextArea" type="text" v-model="nounTextArea" required maxlength="80">
                <input class="rng-submit" type="submit" value="Enter">
            </form> 
            
            <div class="rng-content-wrapper">
                <div class="rng-title">형용사</div>
            </div>
            <div class="rng-container">
              <div class="rng-for" v-for="(adjective,index) in adjectives" v-bind:key="`A-${index}`">
                  <div class="rng-information">{{ adjective.name }}</div>
                  <form class="rng-delete" v-on:submit.prevent="deleteAdjective(adjective.name);">
                      <input class="rng-button" type="submit" value="">
                  </form>
              </div>
            </div>
            <form class="rng-input" v-on:submit.prevent="postAdjective();">
                <input class="rng-inputTextArea" type="text" v-model="adjectiveTextArea" required maxlength="80">
                <input class="rng-submit" type="submit" value="Enter">
            </form> 
            
        </div>
        <div class="bottom">
          - made by Quizlunch
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'quizlunch_manage_rng',
  data() {
    return {
      baseURL: {
        rng : 'https://rng.api.quizlunch.com',
      },
      nouns: [],
      adjectives: [],
      nounTextArea: '',
      adjectiveTextArea: '',
      masterKey:''
    }
  },
  mounted() {
    this.getData()
    },
  methods: {
    removeItemInArray(arr,name) {
    for(var i=0;i<arr.length;i++){
      if(arr[i].name==name){
        arr.splice(i, 1);
        break
      }
    }
    return arr;
    },
    async postNoun(){
      const url = `${this.baseURL['rng']}/manage/nouns/insert`
      var body = {
        name: '',
        masterKey: ''
      }
      body['name'] = this.nounTextArea
      body['masterKey'] = this.masterKey   
      this.nounTextArea = ''   
      var result = await axios.post(url, body)
      alert("새로운 명사 " + body.name+ " 생성되었습니다");
      this.nouns.push(body)
      // alert("비밀번호가 틀립니다");
    },
    async deleteNoun(nounName){

      const url = `${this.baseURL['rng']}/manage/nouns/delete`
      var data = {
        name: '',
        masterKey: ''
      }
      data['name'] = nounName
      data['masterKey'] = this.masterKey   
      var result=await axios.delete(url, {data})
      alert(nounName+" 명사가 삭제되었습니다.");
      this.nouns=this.removeItemInArray(this.nouns,nounName)
      // alert("비밀번호가 틀립니다");

    },
    async postAdjective(){ 
      const url = `${this.baseURL['rng']}/manage/adjectives/insert`
      var body = {
        name: '',
        masterKey: ''
      }
      body['name'] = this.adjectiveTextArea
      body['masterKey'] = this.masterKey   
      this.adjectiveTextArea = ''   
      var result = await axios.post(url, body)
      alert("새로운 형용사 " + body.name+ " 생성되었습니다");
      this.adjectives.push(body)
      // alert("비밀번호가 틀립니다");
    },
    async deleteAdjective(adjectiveName){
      const url = `${this.baseURL['rng']}/manage/adjectives/delete`
      var data = {
        name: '',
        masterKey: ''
      }
      data['name'] = adjectiveName
      data['masterKey'] = this.masterKey   
      var result = await axios.delete(url, {data})
      alert(adjectiveName+" 형용사가 삭제되었습니다.");
      this.adjectives=this.removeItemInArray(this.adjectives,adjectiveName)
      // alert("비밀번호가 틀립니다");
    },
    async getData(){
      const url1 = `${this.baseURL['rng']}/manage/nouns/all`
      var nounData=await axios.get(url1)
      this.nouns=nounData.data

      const url2 = `${this.baseURL['rng']}/manage/adjectives/all`
      var adjectiveData=await axios.get(url2)
      this.adjectives=adjectiveData.data
    } 
  }
}
</script>

<style lang="scss">
.container {
  // padding: 0 3rem;
  .title {
    padding: 1.5rem 0;
    text-align: center; //dev
    font-size: 2.5rem;
    font-weight: 600;
    .logo {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.1rem;
      background: url('~assets/img/logo.svg') no-repeat;
    }
  }

  .rng-area {
    
    display: flex;
    align-content: center;
    padding-bottom: 0.5rem;

    .rng-wrapper {
      
      flex: auto;
      display: flex;
      flex-direction: column;

      text-align: center;

      // border: 3px solid #616161; // devl
      border-radius: 1rem;
      // background: radial-gradient(63.13% 94.45% at 18.96% 20.51%, #FFFFFF 0%, #EEEEEE 100%);
      background: #EEF1F6;
    
      @mixin border-style {

        border-radius: 10px;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      .top {

        padding: 0.5rem 0;
        margin: 0 1rem;

        .masterKey{
          text-align: center;
          font-size:1rem

        }
        
        
      }
      
      .middle {

        .rng-title {
          width: 5rem;
          text-align: center;
          background: #D3DAE6;
          @include border-style;
          

        }
        
        .rng-input {
          text-align: center;

        }
        .rng-inputTextArea {
          text-align: center;

          min-width: 0; // override min-width: auto
          padding-left: 0.5rem;
          border-radius: 1rem 0 0 1rem;
          @include border-style;
        }
        .rng-submit {
          padding-left:0.3rem;
          padding-right:0.5rem;
          @include border-style;
          border-radius: 0 1rem 1rem 0;

          background:none;
          text-align: center;
        }
        .rng-content-wrapper {
          display: flex;
          min-height: 1rem;
          align-items: stretch;
          justify-content: center;

          .rng-content {

          }

        }
        .rng-container{

        
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-gap: 5px;
          grid-auto-rows: minmax(50px, auto);
    
          .rng-for {
          text-align: center;
          @include border-style;
          }

          .rng-information {
          text-align: center;
          @include border-style;
          background: #D3DAE6;
          }

          .rng-delete {
            // flex-basis: 1.6rem;
            // padding: 0 0.5rem;

            .rng-button {
              min-width: 0; // override min-width: auto
              min-height: 0; // override min-width: auto
              height: 1rem;
              width: 1rem;
              border: none;
              background: url('~assets/img/cancel.svg') no-repeat;
              background-size: cover;
            }
          }
        }
      }

      .bottom {
        // flex: 1;

        padding: 0.5rem 0;
        margin: 0 1rem;

        color: #999;
        font-size: 0.5rem;
        text-align: right;
      } // bottom
    }
  }

}
</style>