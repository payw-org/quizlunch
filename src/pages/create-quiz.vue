<template>
  <div class="container">
    <div class="title">
      <div class="logo" />uizLunch
    </div>
    
    <div class="quiz-area">
      <div class="quiz-wrapper">
        <div class="middle">
          <div class="qm-content-wrapper" >
            <div class="qt-title">Author</div>
            <input class="qt-titleTextArea" type="text" v-model="author" required maxlength="80">
          </div>
          <div class="qm-content-wrapper" >
            <div class="qt-title">Data</div>
            <input class="qt-titleTextArea" type="text" v-model="picture" required maxlength="80">
          </div> 
          <div class="qm-content-wrapper" >
            <div class="qt-information">Quiz</div>
          </div>
          <div class="qm-content-wrapper" >
            <textarea class="qt-informationTextArea" type="text" v-model="information" required maxlength="200" />
          </div>
          <div class="qm-content-wrapper" >
            <div class="qt-title">Answer</div>
            <input class="qt-titleTextArea" type="text" v-model="answer" required maxlength="80">
          </div>
          <form class="qm-input" v-on:submit.prevent="postQuiz();">
            <input class="qm-masterKeyTextArea" type="password" v-model="masterKey" required maxlength="80">
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
      author: '',
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
        author: '',
        picture: '',
        information: '',
        answer: '',
        masterKey:''

      }
      body['author'] = this.author
      body['picture'] = this.picture
      body['information'] = this.information
      body['answer'] = this.answer
      body['masterKey'] = this.masterKey
      this.author = ''
      this.picture = ''
      this.information = ''
      this.answer = ''
      this.masterKey = ''
      var result = await axios.post(url, body)
      if(result.data==200)
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
          padding: 0 0.5rem;
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
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 20rem;
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
          width: 8rem; 
          min-width: 0;
          padding-left: 0.5rem;
          padding: 0;
          @include border-style;
          border-radius: 1rem 0 0 1rem;
          }

          .qm-submit {
          padding: 0;
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
  