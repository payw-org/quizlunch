<template>
  <div class="container">
    <div class="title">
      <div class="logo" />uizLunch
    </div>
    
    <div class="quiz-area">
      <div class="quiz-wrapper">
        <div class="middle">
          <div class="qm-content-wrapper" >
            <div class="qt-title">이름</div>
            <input class="qt-titleTextArea" type="text" v-model="title" required maxlength="80">
          </div>
          <div class="qm-content-wrapper" >
            <div class="qt-title">사진</div>
            <input class="qt-titleTextArea" type="text" v-model="picture" required maxlength="80">
          </div> 
          <div class="qm-content-wrapper" >
            <div class="qt-information">내용</div>
          </div>
          <input class="qt-informationTextArea" type="text" v-model="information" required maxlength="80">
          <div class="qm-content-wrapper" >
            <div class="qt-title">정답</div>
            <input class="qt-titleTextArea" type="text" v-model="answer" required maxlength="80">
          </div>
          <form class="qm-input" v-on:submit.prevent="postQuiz();">
            <input class="qm-masterKeyTextArea" type="masterKey" v-model="masterKey" required maxlength="80">
            <input class="qm-submit" type="submit" value="Enter">
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
  name: 'quizlunch_create_quiz',
  data() {
    return {
      baseURL: {
        db : 'https://db.api.quizlunch.com'
      },
      title: '',
      picture: '',
      information: '',
      answer: '', 
      masterKey:'',
    }
  },
  methods: {
    async postQuiz(){
      const url = `${this.baseURL['db']}/quiz/`
      var body = {
        title: '',
        picture: '',
        information: '',
        answer: '',
        masterKey:''

      }
      body['title'] = this.title
      body['picture'] = this.picture
      body['information'] = this.information
      body['answer'] = this.answer
      body['masterKey'] = this.masterKey
      this.title = ''
      this.picture = ''
      this.information = ''
      this.answer = ''
      this.masterKey = ''
      var result = await axios.post(url, body)
      if(result.data=200)
      {
        alert("퀴즈가 생성 되었습니다");
      }
      else
      {
        alert("비밀번호가 틀립니다");
      }
    }
    
  }
}
</script>

<style lang="scss">

.container {
  // padding: 0 3rem;
  .title {
    padding: 1.5rem 0;
    margin: 0 auto;
    align-content: center;
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

  .quiz-area {
    
    display: flex;
    align-content: center;
    padding-bottom: 0.5rem;
    

    .quiz-wrapper {
      
      flex: auto;
      display: flex;
      flex-direction: column;

      padding: 1.5rem;

      text-align: center;

      // border: 3px solid #616161; // devl
      border-radius: 1rem;
      background: #EEF1F6;
      @mixin border-style {

        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        border-radius: 10px;
        
      }
      
      .middle {
        flex: 1;
        padding: 0.5rem 0;
        // margin: 0 5rem;
        
         .qt-title {
          flex: 1;
          text-align: center;
          @include border-style;
          background: #D3DAE6;
          // margin-left: 5rem;
          margin-right: 1rem;
        }
        .qt-titleTextArea {
          flex: 4;
          text-align: center;
          @include border-style;
          // margin-right: 5rem;
        }
        .qt-information {
          text-align: center;
          width:5rem;
          font-size: 2rem;
          @include border-style;
          background: #D3DAE6;
        }
        .qt-informationTextArea {
          flex: auto;
          text-align: center;
          height: 20rem;
          // width: 50rem;
          width: calc(100% - 2rem);
          max-width: 50rem;
          @include border-style;
        }
        .qm-content-wrapper {
          display: flex;
          min-height: 1rem;
          align-items: stretch;
          justify-content: center;
          max-width: 60rem;
          margin-left: auto;
          margin-right: auto;
          .qm-content {

          }

        }

        .qm-input{
          align-items: stretch;

          .qm-masterKeyTextArea{
          flex: auto;
          min-width: 0; // override min-width: auto
          
          padding-left: 0.5rem;
          @include border-style;
          border-radius: 1rem 0 0 1rem;
          }

          .qm-submit {
          
          padding-left:0.3rem;
          padding-right:0.5rem;
          @include border-style;
          border-radius: 0 1rem 1rem 0;

          background:none;
          text-align: center;
          }

        }

        
      }

      .bottom {
        flex: 1;

        padding: 0.5rem 0;
        // margin: 0 1rem;

        color: #999;
        font-size: 0.5rem;
        text-align: right;
      } // bottom
    } // quiz-wrapper
  } // quiz-area

}
</style>
  