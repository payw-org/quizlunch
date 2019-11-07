<template>
  <div class="container">
    <div class="title">Quizlunch</div>
    
    <div class="quiz-area">
      <div class="quiz-left">

      </div>
      <div class="quiz-wrapper">
        <div class="top">
          <!-- <div class="qt-index">#1</div> -->
          <div class="qt-title"> - Problem Title - </div>
          <div class="qt-money">19999 ￦</div>
        </div>
        <div class="middle">
          <div class="qm-content-wrapper" >
            <div class="qm-content">1+1=?</div>
          </div>
        </div>
        <div class="bottom">
          - made by Quizlunch
        </div>
      </div>
      <div class="quiz-right">

      </div>
    </div>
    <div class="answer-area">
      <form class="a-input" v-on:submit.prevent="postAnswer();">
        <input class="ai-textarea" type="textarea" v-model="answerTextarea" required maxlength="80">
        <div class="input-cushion" />
        <input class="ai-submit" type="submit" value="Enter">
      </form> 
    </div>
    <div class="comment-area">
      <form class="c-input" v-on:submit.prevent="postComment();">
        <input class="ci-textarea" type="textarea" v-model="commentTextarea" required minlength="2" maxlength="80">
        <div class="input-cushion" />
        <input class="ci-password" type="password" v-model="commentPassword" required minlength="4">
        <div class="input-cushion" />
        <input class="ci-submit" type="submit" value="Enter">
      </form> 
      <form action=""></form>
      <div class="c-container">
        <div class="cc-comment" v-for="comment in comments" v-bind:key="comment.commentID">
          <div class="comment-nickname">{{ comment.nickname }}</div>
          <div class="comment-context">{{ comment.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'quizlunch_main',
  data() {
    return {
      baseURL: {
        db : 'https://db.api.quizlunch.com',
        rng : 'https://rng.api.quizlunch.com',
        db_ws: 'wss://db2.api.quizlunch.com'
      },
      quizID: 1,
      comments: [],
      commentTextarea: '',
      commentPassword: '',
      answerTextarea: ''
    }
  },
  mounted(){
    this.renewCommentsWS()
  },
  methods: {
    async postComment(){
      const url = `${this.baseURL['db']}/comment/`
      var body = {
        quizID: '',
        nickname: '',
        text: '',
        password: ''
      }//quizID need to fix
      body['quizID'] = this.quizID
      body['text'] = this.commentTextarea
      body['password'] = this.commentPassword
      this.commentTextarea = ''
      await axios.post(url, body)
    },
    async postAnswer(){ // need to fix
      const url = `${this.baseURL['db']}/comment/`
      var body = {
        quizID: '',
        nickname: '',
        text: '',
        password: ''
      }//quizID need to fix
      body['quizID'] = this.quizID
      body['text'] = this.commentTextarea
      body['password'] = this.commentPassword
      this.commentTextarea = ''
      await axios.post(url, body)
    },
    async renewCommentsWS(){
      var ws = new WebSocket(this.baseURL['db_ws'])

      ws.onopen = (event)=>{
        console.log('connected')
      }

      ws.onmessage = (event)=>{
        var result = JSON.parse(event.data)
        this.comments = result
      }

      ws.onerror = (event)=>{
        console.log("Sever error message :" + event.data )
      }
      ws.onclose = (event)=>{
        console.log("Sever closed")
        ws = new WebSocket(this.baseURL['db_ws'])
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
    text-align: center; //dev
    font-size: 2.5rem;
    font-weight: 700;
  }

  .quiz-area {
    display: flex;
    align-content: center;
    padding-bottom: 0.5rem;
    .quiz-left {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.3rem solid #616161;
      border-radius: 1rem;
      margin: auto 0.5rem;   
    }
    .quiz-right {
      flex-basis: 2rem;
      height:2rem;
      width:2rem;

      border: 0.3rem solid #616161;
      border-radius: 1rem;
      margin: auto 0.5rem;  
    }
    .quiz-wrapper {
      flex: auto;
      display: flex;
      flex-direction: column;

      text-align: center;

      border: 3px solid #616161; // devl
      border-radius: 1rem;
      .top {
        flex: 1;
        display: flex;

        padding: 1rem 0;
        
        .qt-title {
          flex: auto;
        }
        .qt-money {
          flex-basis: 6rem;

          padding-right: 1rem;
          // border-left: 1px solid #616161;

          text-align: right;
          font-size: 0.9rem;
        }
      }
      
      .middle {
        flex: 1;

        .qm-content-wrapper {
          display: flex;
          min-height: 10rem;
          align-items: center;
          justify-content: center;

          .qm-content {

          }

        }
      }

      .bottom {
        flex: 1;

        padding: 0.5rem 0;
        margin: 0 1rem;

        color: #999;
        font-size: 0.5rem;
        text-align: right;
      } // bottom
    } // quiz-wrapper
  } // quiz-area

  .answer-area{
    padding-bottom: 2rem;
    .a-input {
      display: flex;
      
      margin: 0 8rem;
      .ai-textarea {
        flex: auto;
        min-width: 0; // override min-width: auto
        
        padding-left: 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 3px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 1rem 0 0 1rem;
        font-size: 1rem;
      }

      .ai-submit {
        flex-basis: 3rem;
        
        padding-left:0.3rem;
        padding-right:0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 3px solid #616161;
        border-radius: 0 1rem 1rem 0;

        background:none;
        text-align: center;
        font-size: 0.8rem;
      }

    } //a-input
  } // answer-area

  .comment-area {

    font-size: 0.75rem;
    .c-input {
      display: flex;
      
      margin: 0 2rem;
      .ci-textarea {
        flex: auto;
        min-width: 0; // override min-width: auto
        
        padding-left: 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 3px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 1rem 0 0 1rem;
        font-size: 1rem;
      }

      .ci-password {
        flex-basis: 3rem;
        min-width: 0; // override min-width: auto
        
        padding: 0 0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 0px solid #616161;
        border-radius: 0;
        font-size: 1rem;
      }

      .ci-submit {
        flex-basis: 3rem;
        
        padding-left:0.3rem;
        padding-right:0.5rem;
        border-top: 3px solid #616161;
        border-bottom: 3px solid #616161;
        border-left: 0px solid #616161;
        border-right: 3px solid #616161;
        border-radius: 0 1rem 1rem 0;

        background:none;
        text-align: center;
        font-size: 0.8rem;
      }

    }

    .c-container {
      margin: 0 0.5rem;
      .cc-comment {
        display: flex;

        margin-top: 0.5rem;
        .comment-nickname {
          flex-basis: 6rem;

          border-right: 1px solid #616161;

          text-align: center;
        }
        .comment-context {
          flex: 5;

          padding: 0 0.5rem;

          text-align: left;
        }
      }
    } // c-container
  } //comment-area

  .input-cushion {
    border-left: 1px solid #616161;
    border-right: 1px solid #616161;
  }
}
</style>
  